import React, { useState } from 'react'
import { Table, Select, Radio } from 'antd';
import searchImg from "../../assets/search.svg";
import './style.css';
import { unparse, parse } from "papaparse";
import { toast } from 'react-toastify';
import { DeleteOutlined } from '@ant-design/icons';
import { doc, deleteDoc } from "firebase/firestore";
import { db } from '../../firebase'; 
import PropTypes from 'prop-types';

const {Option}= Select;

function TransactionTable({transactions, addTransaction, fetchTransactions, user, setTransactions}) {

    const [sortKey,setSortKey]= useState("")
    const [search, setSearch]= useState("")
    const [typeFilter, setTypeFilter]= useState("")

    const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Amount (₹)',
          dataIndex: 'amount',
          key: 'amount',
        },
        {
          title: 'Tag',
          dataIndex: 'tag',
          key: 'tag',
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
          },
          {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
          },
          {
            title: 'Edit',
            key: 'Edit',
            render: (text, record) => (
            <DeleteOutlined onClick={() => handleEdit(record)}/>
            ),
          },
      ];
      
      let filterTransaction = transactions && Array.isArray(transactions) 
      ? transactions.filter((item) => 
          item.name && item.name.toLowerCase().includes(search && search.toLowerCase()) && 
          item.type && item.type.includes(typeFilter)
        )
      : [];
  
      let sortedTransactions = filterTransaction.sort((a,b)=>{
        if(sortKey === "amount"){
            return a.amount - b.amount;
        } else if(sortKey === "date"){
            return new Date(a.date)- new Date(b.date);
        } else { return 0; }
      });

      const ExportCsv = ()=>{
        var csv = unparse({
            "fields": ["name", "amount", "tag", "type", "date"],
            "data": transactions
        });
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "transactions.csv";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }

      const ImportCsv= (event)=> {
        event.preventDefault();
        try {
          parse(event.target.files[0], {
            header: true,
            complete: async function (results) {

              for (const transaction of results.data) {
                console.log("Transactions", transaction);
                const newTransaction = {
                  ...transaction,
                  amount: parseInt(transaction.amount),
                };
                await addTransaction(newTransaction, true);
              }

            },
          });
          toast.success("All Transactions Added");
          fetchTransactions();
          event.target.files = null;
          
      } catch(e) { toast.error(e.message); } }

      //deleting the record-------------------

      const handleEdit = async (record) => {
        // console.log('Deleting record:', record);
        try {
            await deleteDoc(doc(db, `users/${user.uid}/transactions`, record.id));
            toast.success("Transaction deleted successfully!");
            // setTransactions(prevTransactions => prevTransactions.filter(transaction => transaction.id !== record.id));
            console.log(record)
        } catch (error) {
            toast.error("Failed to delete transaction, Please try again later.");
        }
      };
      
      return (
          <div
             style={{width: "95%",padding: "0rem 2rem",}}>
      <div style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "1rem",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
          <div className='input-flex'>
          <img src={searchImg} width="18" alt='search'/>
          <input value={search} onChange={e=> setSearch(e.target.value)} placeholder='Search by name'/>
          </div>
          <Select
           className="select-input"
           onChange={(value)=>{setTypeFilter(value)}}
           value={typeFilter}
           placeholder="Filter"
           allowClear
           >
            <Option value="">All</Option>
            <Option value="income">Income</Option>
            <Option value="expense">Expense</Option>
          </Select>
          </div>
          <div className="my-table">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            marginBottom: "1rem",
          }}
        >
          <h2>My Transactions</h2>

          <Radio.Group
            className="input-radio"
            onChange={(e) => setSortKey(e.target.value)}
            value={sortKey}
          >
            <Radio.Button value="">No Sort</Radio.Button>
            <Radio.Button value="date">Sort by Date</Radio.Button>
            <Radio.Button value="amount">Sort by Amount</Radio.Button>
          </Radio.Group>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "1rem",
              width: "400px",
            }}
          >
            <button 
            className="btn"
            onClick={ExportCsv}
            >Export to CSV</button>
            <label htmlFor="file-csv" className="btn btn-blue">Import from CSV</label>
            <input
              id="file-csv"
              type="file"
              onChange={ImportCsv}
              accept=".csv"
              required
              style={{ display: "none" }}
            />
          </div>
        </div>

        <Table columns={columns} dataSource={sortedTransactions} />
      </div>
    </div>
  )
}

TransactionTable.propTypes = {
  transactions: PropTypes.arrayOf(PropTypes.object).isRequired,
  addTransaction: PropTypes.func.isRequired,
  fetchTransactions: PropTypes.func.isRequired,
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }).isRequired,
  setTransactions: PropTypes.func.isRequired,
};

export default TransactionTable;