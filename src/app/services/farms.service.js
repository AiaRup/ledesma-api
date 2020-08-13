const {
  EntityNotFoundError,
  EntityExistsUnprocessableEntityError
} = require('../errors');
const { objectToDotNotation } = require('../../helpers');

function FarmsService({ FarmsModel, config }) {
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
    ...query
  }) {
    const options = {
      page: page || defaultPage,
      limit: limit || defaultLimit,
      sort: field
        ? { [field]: sortDirection || defaultDirection }
        : defaultSort,
      lean: true,
      leanWithId: false
    };
    const farms = await FarmsModel.paginate({ ...query }, options);

    return farms;
  }

  async function get({ id }) {
    const farm = await FarmsModel.findOne({ _id: id }).lean();
    if (!farm) {
      throw new EntityNotFoundError(id);
    }

    return farm;
  }

  async function create(nodeData) {
    const modelObject = await FarmsModel;

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
    const farm = await FarmsModel.findOneAndUpdate(
      { _id: id },
      { $set: objectToDotNotation(nodeData) },
      { new: true }
    )
      .populate(['farms'])
      .lean();

    if (!farm) {
      throw new EntityNotFoundError(id);
    }

    return farm;
  }

  async function remove(_id) {
    const result = await FarmsModel.deleteOne({ _id });

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

module.exports = FarmsService;
