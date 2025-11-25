module.exports = (sequelize, DataTypes) => {
  const Komik = sequelize.define(
    'Komik',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      judul: {
        type: DataTypes.STRING,
        allowNull: false
      },
      author: {
        type: DataTypes.STRING,
        allowNull: false
      },
      deskripsi: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      imageType: DataTypes.STRING,
      imageName: DataTypes.STRING,
      imageData: DataTypes.BLOB('long'),
    },
    {
      tableName: 'komik',
      timestamps: false
    }
  );

  return Komik;
};
