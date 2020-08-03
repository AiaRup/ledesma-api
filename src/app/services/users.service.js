const {
  EntityNotFoundError,
  EntityExistsUnprocessableEntityError
} = require('../errors');
const { objectToDotNotation } = require('../../helpers');

function UsersService({ UserModel, config }) {
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
      populate: ['farms'],
      lean: true,
      leanWithId: false
    };
    const users = await UserModel.paginate({ ...query }, options);

    return users;
  }

  async function get({ id }) {
    const user = await UserModel.findOne({ _id: id })
      .populate(['farms'])
      .lean();
    if (!user) {
      throw new EntityNotFoundError(id);
    }

    return user;
  }

  async function create(nodeData) {
    const modelObject = await UserModel;

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
    const user = await UserModel.findOneAndUpdate(
      { _id: id },
      { $set: objectToDotNotation(nodeData) },
      { new: true }
    )
      .populate(['farms'])
      .lean();

    if (!user) {
      throw new EntityNotFoundError(id);
    }

    return user;
  }

  async function remove(_id) {
    const result = await UserModel.deleteOne({ _id });

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

module.exports = UsersService;
