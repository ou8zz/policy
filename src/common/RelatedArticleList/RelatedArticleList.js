/**
 * Created by ssehacker on 2018/3/27.
 */
import React from 'react';
import { Form, Table } from 'antd';
import Filter from '../Filter/Filter';
import * as columnSvc from '../../services/columns';
import './RelatedArticleList.less'

const pageSize = 10;
class RelatedArticleList extends React.Component {

  constructor(props) {
    super(props);
    this.columnId = this.props.columnId;
    this.state = {
      dataSource: [],
      channelOptions: [],
      columnOptions: [],
      selectedRowKeys: [],
      current: 1,
      total: 0,
    };

  }

  componentDidMount() {
    columnSvc.fetchChannels()
      .then(res => {
        const channelOptions = res || [];
        this.setState({
          channelOptions: channelOptions.filter(item => {
            return item.id !== 1000
          }).map(item => {
            return ({
              label: item.name,
              value: item.id,
            })
          }),
        });
      });
    if (this.props.channelId) {
      this.fetchColumnOptions(this.props.channelId);
    }

    this.fetchList({});
  }

  getSelectedRowKeys = () => {
    return this.state.selectedRowKeys;
  };

  fetchList = ({
    title = this.title,
    columnId=this.columnId,
    current=this.state.current,
  }) => {
    columnSvc.fetchArticleListByColumnIdFrom({
      title: title || undefined,
      columnId: columnId || 0,
      current,
      pageSize: 10,
    }).then(res => {
      this.setState({
        dataSource: res.currentPageRows || [],
        total: res.totalRowsCount,
        current,
      });
    })
  }

  getColumns = () => {
    const columns = [
      {
        title: '类型',
        dataIndex: 'type',
        key: 'type',
        width: 50,
        render: (text, record) => (
          <div>
            {
              record.type === -1
                ? '电报' : '文章'
            }
          </div>
        ),
      },
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        width: 80,
      },
      /*{
        title: '频道名称',
        dataIndex: 'depthChannelNames',
        key: 'depthChannelNames',
        width: 80,
        render: (text, record) => (
          <div>
            {text && text.join(' | ')}
          </div>
        ),
      },
      {
        title: '栏目名称',
        dataIndex: 'depthColumnNames',
        key: 'depthColumnNames',
        width: 80,
        render: (text, record) => (
          <div>
            {text && text.join(' | ')}
          </div>
        ),
      },*/
      {
        title: '标题',
        dataIndex: 'title',
        key: 'title',
        width: 400,
      }
    ];
    return columns;
  };

  fetchColumnOptions = (channelId) => {
    if (channelId === undefined) {
      this.setState({
        columnOptions: [],
      });
      return;
    }
    columnSvc.fetchColumnsByChannel({
      channelId,
      current: 1,
      pageSize: 9999,
    }).then(res => {
      const columnOptions = res.list || [];
      this.setState({
        columnOptions: columnOptions.map(item => ({
          label: item.name,
          value: item.id,
        })),
      })
    })
  };


  getFilterFields = () => {
    const disabled = !!(this.props.columnId && this.props.channelId);
    const fields = [
      /*{
        id: 'channelId',
        label: '频道',
        type: 'Select',
        initialValue: (this.props.columnId && this.props.channelId) ? this.props.channelId :'',
        props: {
          children: this.state.channelOptions,
          disabled,
          allowClear: true,
          onChange: (val) => {
            this.filter.setFieldsValue({columnId: undefined});
            this.fetchColumnOptions(val);
          }
        }
      },
      {
        id: 'columnId',
        label: '栏目',
        type: 'Select',
        initialValue: this.props.columnId,
        props: {
          disabled: !!this.props.columnId,
          allowClear: true,
          children: this.state.columnOptions,
        }
      },*/
      {
        id: 'title',
        label: '标题',
        type: 'Input',
        // initialValue: data.nickname
      },
    ];
    return fields;
  };

  handleSearch = (values) => {
    const {columnId, title} = values;
    this.columnId = columnId;
    this.title = title;
    this.fetchList({
      columnId,
      title,
      current: 1,
      status: 1,
    });
  };

  render() {

    const pagination = {
      current: this.state.current,
      pageSize,
      total: this.state.total,
      onChange: (current) => {
        this.fetchList({
          current,
        });
      }
    };

    const rowSelection = {
      selectedRowKeys: this.state.selectedRowKeys,
      type: this.props.multi ? 'checkbox' : 'radio',
      onChange: (selectedRowKeys) => {
        this.setState({
          selectedRowKeys,
        });
      },
      getCheckboxProps: record => ({
        disabled: record.status === 'delete' || record.status === 'hide' || record.status === 'auditing' || record.status === 'started',
      }),
    };

    return (
      <div className="related-article-list">
        <Filter
          ref={(node) => {this.filter = node;}}
          fields={this.getFilterFields()}
          onSearch={this.handleSearch}
        />
        <Table
          rowKey="id"
          rowSelection={rowSelection}
          pagination={pagination}
          bordered
          dataSource={this.state.dataSource}
          columns={this.getColumns()}
        />
      </div>
    )
  }
}

export default RelatedArticleList;
