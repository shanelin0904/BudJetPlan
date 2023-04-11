const { Tag } = require('../models');
const helpers = require('../_helpers');

const tagServices = {
  getTags: (req, cb) => {
    Tag.findAll({ where: { userId:  helpers.getUser(req).id} })
      .then(tags => {
        cb(null, { tags });
      })
      .catch(err => cb(err));
  },
  getTag: (req, cb) => {
    const tagId = req.params.id;
    Tag.findOne({ where: { id: tagId, userId:  helpers.getUser(req).id } })
      .then(tag => {
        if (!tag) throw new Error('Tag not found.');
        cb(null, { tag });
      })
      .catch(err => cb(err));
  },
  postTag: (req, cb) => {
    const { title, colorCode } = req.body;
    Tag.create({
      title,
      colorCode,
      userId:  helpers.getUser(req).id
    })
      .then(tag => {
        cb(null, { tag });
      })
      .catch(err => cb(err));
  },
  updateTag: (req, cb) => {
    const tagId = req.params.id;
    const { title, colorCode } = req.body;
    Tag.findOne({ where: { id: tagId, userId:  helpers.getUser(req).id } })
      .then(tag => {
        if (!tag) throw new Error('Tag not found.');
        tag.title = title || tag.title;
        tag.colorCode = colorCode || tag.colorCode;
        return tag.save();
      })
      .then(updatedTag => {
        cb(null, { tag: updatedTag });
      })
      .catch(err => cb(err));
  },
  deleteTag: (req, cb) => {
    const tagId = req.params.id;
    Tag.findOne({ where: { id: tagId, userId:  helpers.getUser(req).id } })
      .then(tag => {
        if (!tag) throw new Error('Tag not found.');
        return tag.destroy();
      })
      .then(() => {
        cb(null, { message: 'Tag deleted.' });
      })
      .catch(err => cb(err));
  }
};

module.exports = tagServices;
