module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define(
        'post',
        {
            message: {
                type: DataTypes.STRING,
            },
        },
        {
            timestamps: false,
        }
    );

    return Post;
};
