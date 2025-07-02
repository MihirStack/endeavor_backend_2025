import { Sequelize, Model, DataTypes } from 'sequelize';
import { userHooks } from './hooks/user.hooks';

export class User extends Model {
    public id!: string;
    public first_name!: string;
    public middle_name!: string;
    public last_name!: string;
    public email!: string;
    public password!: string;

    static initModel(connection: Sequelize) {
        User.init({
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            first_name: {
                type: DataTypes.STRING(255),
                allowNull: false,
                defaultValue: ''
            },
            middle_name: {
                type: DataTypes.STRING(255),
                allowNull: false,
                defaultValue: ''
            },
            last_name: {
                type: DataTypes.STRING(255),
                allowNull: false,
                defaultValue: ''
            },
            email: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
        }, {
            tableName: 'tbl_user',
            sequelize: connection,
            freezeTableName: true,
            timestamps: true,
            paranoid: true // Enable soft delete (adds deletedAt)
        });
        User.addHook('beforeCreate', userHooks.beforeCreate);
        User.addHook('beforeCreate', userHooks.hashPassword);
        User.addHook('beforeUpdate', userHooks.hashPassword);
    }

    static initAssociations() {
        // define association here
    }
}