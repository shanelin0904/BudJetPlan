const { Category , Genre } = require('../models');
const helpers = require('../_helpers');

const categoryServices = {
    getCategories: (req, cb) => {
        Category.findAll({ where: { userId: helpers.getUser(req).id } })
            .then(categories => {
                cb(null, { categories });
            })
            .catch(err => cb(err));
    },
    getCategory: (req, cb) => {
        const categoryId = req.params.id;
        Category.findOne({ where: { id: categoryId, userId: helpers.getUser(req).id } })
            .then(category => {
                if (!category) throw new Error('Category not found.');
                cb(null, { category });
            })
            .catch(err => cb(err));
    },
    getCategoriesByGenreId: (req, cb) => {
        const genreId = req.params.genre_id
        Genre.findOne({ where: { id: genreId } })
            .then(genre => {
                if (!genre) throw new Error('Genre not found.')
                return Category.findAll({ where: { genreId: genreId, userId: helpers.getUser(req).id } })
            })
            .then(categories => {
                cb(null, { categories })
            })
            .catch(err => cb(err))
    },
    postCategory: (req, cb) => {
        const { title, genreId } = req.body;
        Category.create({
            title,
            userId: helpers.getUser(req).id,
            genreId
        })
            .then(category => {
                cb(null, { category });
            })
            .catch(err => cb(err));
    },
    updateCategory: (req, cb) => {
        const categoryId = req.params.id;
        const { title, genreId } = req.body;

        // 檢查指定的 genre 是否存在
        Genre.findOne({ where: { id: genreId } })
            .then(genre => {
                if (genreId && !genre) throw new Error('找不到該 genre.');

                // 找到要更新的分類
                return Category.findOne({ where: { id: categoryId, userId: helpers.getUser(req).id } });
            })
            .then(category => {
                if (!category) throw new Error('找不到該分類.');

                // 如果 title 或 genreId 在請求內容中有提供，則更新分類的 title 和 genreId
                category.title = title ?? category.title;
                category.genreId = genreId ?? category.genreId;

                // 儲存更新後的分類
                return category.save();
            })
            .then(updatedCategory => {
                cb(null, { category: updatedCategory });
            })
            .catch(err => cb(err));
    },

    deleteCategory: (req, cb) => {
        const categoryId = req.params.id;
        Category.findOne({ where: { id: categoryId, userId: helpers.getUser(req).id } })
            .then(category => {
                if (!category) throw new Error('Category not found.');
                return category.destroy();
            })
            .then(() => {
                cb(null, { message: 'Category deleted.' });
            })
            .catch(err => cb(err));
    }
};

module.exports = categoryServices;
