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
    Row,
} from 'antd';

// import AxiosRest from '../../libs/AxiosRest';

import {
    getAllSharingLevel,
    createSharingLevel,
    updateSharingLevelById,
    deleteSharingLevelById,
} from '../../controllers/sharingLevels';

const FormItem = Form.Item;

class Page extends Component {

    constructor(props) {
        super(props);

        this.state = {
            label: {
                cardTitle: 'Sharing Level List',
                modalTitleNew: 'Update Sharing Level',
                modalTitleUpdate: 'Create Sharing Level',
                notificationMessage: 'Info',
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
        getAllSharingLevel()
            .then((res) => {
                this.setState({ dataTables: res });
            });
    };

    handleSubmit = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const body = Object.assign({}, values);
                if (this.state.isFormUpdate) {
                    updateSharingLevelById(this.state.updatedata.id, body)
                        .then((result) => {
                            if (result.success) {
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
                        }).catch((error) => {
                            notification.error({
                                message: 'Error',
                                description: error.message || 'Sorry! Something went wrong. Please try again!',
                            });
                        });
                } else {
                    createSharingLevel(body)
                        .then((result) => {
                            if (result.success) {
                                notification.success({
                                    message: this.state.label.notificationMessage,
                                    description: 'Data created successfully',
                                });
                                // close modal
                                this.openModal(false);
                                // reload list
                                this.handleList();
                            } else {
                                notification.error({
                                    message: this.state.label.notificationMessage,
                                    description: 'Data submitted is failed',
                                });
                            }
                        }).catch((error) => {
                            notification.error({
                                message: 'ERROR',
                                description: error.message || 'Sorry! Something went wrong. Please try again!',
                            });
                        });
                }
            }
        });
    };

    handleDelete = (id) => {
        deleteSharingLevelById(id)
            .then((res) => {
                const dataTables = [...this.state.dataTables];
                this.setState({ dataTables: dataTables.filter(item => item.id !== id) });
                notification.success({
                    message: this.state.label.notificationMessage,
                    description: res.message || 'Data deleted successfully',
                });
            }).catch((error) => {
                notification.error({
                    message: 'ERROR',
                    description: error.message || 'Sorry! Something went wrong. Please try again!',
                });
            });
    };

    handleUpdate = (record) => {
        this.setState({ isFormUpdate: true });
        this.setState({ updatedata: record });
        this.props.form.setFieldsValue({
            grade: record.grade,
            sharingLevel: record.sharingLevel,
        });
        this.openModal(true);
    };

    handleNewModal = () => {
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
            grade: null,
            sharingLevel: null,
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

    getModalTitle = () => this.state.isFormUpdate ?
    this.state.label.modalTitleNew : this.state.label.modalTitleUpdate;

    headerTable = () => [{
        key: 'header-column-id',
        title: 'ID',
        dataIndex: 'id',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.id - b.id,
    }, {
        key: 'header-column-grade',
        title: 'Grade',
        dataIndex: 'grade',
        // render: text => <a href="javascript:;">{text}</a>,
        // sorter: (a, b) => a.grade - b.grade,
    }, {
        key: 'header-column-sharing-level',
        title: 'Sharing Level',
        dataIndex: 'sharingLevel',
        sorter: (a, b) => a.sharingLevel - b.sharingLevel,
    }, {
        key: 'header-column-action',
        title: 'Action',
        dataIndex: 'id',
        // render: (id, row, index) =>
        // <button type="button" className="ant-btn ant-btn-danger" onClick={(e) =>
        // this.state.showDeleteConfirm(id, row, index)}>Delete</button>,
        render: (text, record) => (
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
            ),
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
                <FormItem label="Grade">
                  {getFieldDecorator('grade', {
                                rules: [{ required: true, message: 'Please input grade name!', whitespace: true }],
                            })(
                              <Input type="text" id="grade" placeholder="input grade name" />
                            )}
                </FormItem>
                <FormItem label="Sharing Level">
                  {getFieldDecorator('sharingLevel', {
                                rules: [{ required: true, message: 'Please input sharing level!' }],
                            })(
                              <Input type="number" id="sharingLevel" placeholder="input sharing level" />
                            )}
                </FormItem>
              </Form>
            </Modal>
          </Row >
        );
    }
}

export default Form.create()(Page);
