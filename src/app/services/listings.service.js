const moment = require('moment');

const {
  EntityNotFoundError,
  EntityExistsUnprocessableEntityError
} = require('../errors');
const { objectToDotNotation } = require('../../helpers');

function ListingsService({ ListingModel, config }) {
  const {
    page: defaultPage,
    limit: defaultLimit,
    sortDirection: defaultDirection,
    sort: defaultSort
  } = config.search.pageOptions;

  async function search({
    field,
    sortDirection,
    page,
    limit,
    active,
    updatedAt,
    ...rest
  }) {
    const options = {
      page: page || defaultPage,
      limit: limit || defaultLimit,
      sort: field
        ? { [field]: sortDirection || defaultDirection }
        : defaultSort,
      lean: true,
      leanWithId: false,
      populate: ['head']
    };
    let query = {};
    if (updatedAt) {
      query = {
        ...rest,
        updatedAt: {
          $gte: moment(updatedAt, 'DD/MM/YYYY').startOf('day'),
          $lte: moment(updatedAt, 'DD/MM/YYYY').endOf('day')
        }
      };
    }
    const users = await ListingModel.paginate({ ...query }, options);

    return users;
  }

  async function get({ id }) {
    const listing = await ListingModel.findOne({ _id: id }).lean();
    if (!listing) {
      throw new EntityNotFoundError(id);
    }

    return listing;
  }

  async function create(nodeData) {
    const modelObject = await ListingModel;

    let nodeCreated = null;

    nodeCreated = await modelObject.create(nodeData).catch(error => {
      if (error.name === 'MongoError' && error.code === 11000) {
        throw new EntityExistsUnprocessableEntityError({
          key: nodeData.key,
          product: nodeData.product
        });
      }
      throw error;
    });

    return nodeCreated.toObject();
  }

  async function update(id, nodeData) {
    const listing = await ListingModel.findOneAndUpdate(
      { _id: id },
      { $set: objectToDotNotation(nodeData) },
      { new: true }
    )
      .populate(['farms'])
      .lean();

    if (!listing) {
      throw new EntityNotFoundError(id);
    }

    return listing;
  }

  async function remove(_id) {
    const result = await ListingModel.deleteOne({ _id });

    return { _id, deleted: result.n > 0 };
  }

  return {
    search,
    get,
    create,
    update,
    remove
  };
}

module.exports = ListingsService;
