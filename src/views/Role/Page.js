import React, { Component } from 'react';
import {
    Button,
    Card,
    Col,
    Divider,
    Form,
    Popconfirm,
    Table,
    Input,
    Icon,
    Modal,
    notification,
    Row
} from 'antd';
import {
    getAllRoles,
    createRole,
    updateRoleById,
    deleteRoleById
} from '../../controllers/role';

const FormItem = Form.Item;

class Page extends Component {

    constructor(props) {
        super(props);

        this.state = {
            label: {
                cardTitle: 'Roles List',
                modalTitleNew: 'Update Role',
                modalTitleUpdate: 'Create Role',
                notificationMessage: 'Info'
            },
            isFormUpdate: false,
            modalVisible: false,
            dataTables: [],
            updatedata: {},
            rowSelection: {
                onChange: this.onChange,
                getCheckboxProps: this.getCheckboxProps,
            },
        };
    }

    componentDidMount() {
        this.handleList();
    }

    handleList = () => {
        getAllRoles()
            .then((res) => {
                this.setState({ dataTables: res });
            });
    };

    handleSubmit = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const body = Object.assign({}, values);
                if (this.state.isFormUpdate) {
                    updateRoleById(this.state.updatedata.id, body)
                        .then((result) => {
                            console.log(result);
                            if (result.id == this.state.updatedata.id) {
                                notification.success({
                                    message: this.state.label.notificationMessage,
                                    description: 'Data updated successfully',
                                });
                                // close modal
                                this.openModal(false);
                                // reload list
                                this.handleList();
                            } else {
                                notification.error({
                                    message: this.state.label.notificationMessage,
                                    description: 'Data updated is failed',
                                });
                            }
                        }).catch(error => {
                            notification.error({
                                message: 'Catch',
                                description: error.message || 'Sorry! Something went wrong. Please try again!'
                            });
                        });
                } else {
                    createRole(body)
                        .then((result) => {
                            console.log(result);
                            if (result.roleName == values.roleName) {
                                notification.success({
                                    message: 'Success',
                                    description: 'Data created successfully',
                                });
                                // close modal
                                this.openModal(false);
                                // reload list
                                this.handleList();
                            } else {
                                notification.error({
                                    message: 'Create Failed',
                                    description: result.message || 'Data submitted is failed',
                                });
                            }
                        }).catch(error => {
                            console.log(error);
                            notification.error({
                                message: 'Catch',
                                description: error.message || 'Sorry! Something went wrong. Please try again!'
                            });
                        });
                }
            }
        });
    };

    handleDelete = (id) => {
        deleteRoleById(id)
            .then((res) => {
                const dataTables = [...this.state.dataTables];
                this.setState({ dataTables: dataTables.filter(item => item.id !== id) });
                notification.success({
                    message: this.state.label.notificationMessage,
                    description: 'Data deleted successfully',
                });
            }).catch(error => {
                notification.error({
                    message: 'Catch',
                    description: error.message || 'Sorry! Something went wrong. Please try again!'
                });
            });
    };

    handleUpdate = (record) => {
        this.setState({ isFormUpdate: true });
        this.setState({ updatedata: record });
        this.props.form.setFieldsValue({
            roleName: record.roleName
        });
        this.openModal(true);
    };

    handleNewModal = (record) => {
        this.setState({ updatedata: {} });
        this.setState({ isFormUpdate: false });
        this.resetFormFields();
        this.openModal(true);
    };

    handleCancel = () => {
        this.setState({ updatedata: {} });
        this.resetFormFields();
        this.openModal(false);
    };

    resetFormFields = () => {
        this.props.form.setFieldsValue({
            roleName: null
        });
    };

    openModal = (modalVisible) => {
        this.setState({ modalVisible });
    };

    onChange = (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    };

    getCheckboxProps = record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
    });

    getModalTitle = () => {
        return this.state.isFormUpdate ? this.state.label.modalTitleNew : this.state.label.modalTitleUpdate;
    };

    headerTable = () => [{
        key: 'header-column-id',
        title: 'ID',
        dataIndex: 'id',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.id - b.id,
    }, {
        key: 'header-column-rolename',
        title: 'Role Name',
        dataIndex: 'roleName',
        // render: text => <a href="javascript:;">{text}</a>,
        // sorter: (a, b) => a.grade - b.grade,
    }, {
        key: 'header-column-action',
        title: 'Action',
        dataIndex: 'id',
        // render: (id, row, index) => <button type="button" className="ant-btn ant-btn-danger" onClick={(e) => this.state.showDeleteConfirm(id, row, index)}>Delete</button>,
        render: (text, record, index) => {
            return (
                this.state.dataTables.length > 0
                    ? (
                        <span>
                            <a className="ant-btn ant-btn-info" onClick={() => this.handleUpdate(record)} href="javascript:;"><Icon type="edit" /> Edit</a>
                            <Divider type="vertical" />
                            <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.id)}>
                                <a className="ant-btn ant-btn-danger" href="javascript:;"><Icon type="delete" /> Delete</a>
                            </Popconfirm>
                        </span>
                    ) : null
            );
        },
    }];

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Row>
                <Col span={48}>
                    <Card title={<span><Icon type="bars" /> {this.state.label.cardTitle}</span>} bordered extra={<Button type="primary" icon="plus-circle-o" onClick={() => this.handleNewModal()}>Add New Data</Button>}>
                        <Table
                            rowKey={record => record.id}
                            columns={this.headerTable()}
                            dataSource={this.state.dataTables}
                            rowSelection={this.state.rowSelection}
                        />
                    </Card>
                </Col>

                <Modal
                    title={this.getModalTitle()}
                    centered
                    visible={this.state.modalVisible}
                    onOk={() => this.handleSubmit()}
                    onCancel={() => this.handleCancel()}
                >
                    <Form layout="vertical" onSubmit={this.handleSubmit}>
                        <FormItem label="Role">
                            {getFieldDecorator('roleName', {
                                rules: [{ required: true, message: 'Please input Role Name!' }],
                            })(
                                <Input type="text" id="roleName" placeholder="input Role Name" />
                            )}
                        </FormItem>
                    </Form>
                </Modal>
            </Row >
        );
    }
}

export default Form.create()(Page);
