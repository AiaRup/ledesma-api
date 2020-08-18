const {
  EntityNotFoundError,
  EntityExistsUnprocessableEntityError
} = require('../errors');
const { objectToDotNotation } = require('../../helpers');

function HeadsService({ HeadModel, config }) {
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
      leanWithId: false,
      populate: ['farm', 'users']
    };
    const heads = await HeadModel.paginate({ ...query }, options);

    return heads;
  }

  async function get({ id }) {
    const head = await HeadModel.findOne({ _id: id }).lean();
    if (!head) {
      throw new EntityNotFoundError(id);
    }

    return head;
  }

  async function create(nodeData) {
    const modelObject = await HeadModel;

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
    const head = await HeadModel.findOneAndUpdate(
      { _id: id },
      { $set: objectToDotNotation(nodeData) },
      { new: true }
    )
      .populate(['farm', 'users'])
      .lean();

    if (!head) {
      throw new EntityNotFoundError(id);
    }

    return head;
  }

  async function remove(_id) {
    const result = await HeadModel.deleteOne({ _id });

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

module.exports = HeadsService;
