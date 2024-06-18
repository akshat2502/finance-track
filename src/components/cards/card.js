import React, {useState} from 'react'
import { Card, Modal, Row } from 'antd';
import "./card.css"
import Button from '../buttons/button';
import PropTypes from 'prop-types';



function Cards({showExpenseModal, showIncomeModal, income, expense, balance, resetBalance}) {

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  function handleResetBalance() {
    setShowConfirmationModal(true);
  }

  function handleCancelReset() {
    setShowConfirmationModal(false);
  }

  // function handleClick(){
  //   resetBalance();
  //   setShowConfirmationModal(true);
  // }

  return (
    <div>
    <Row className='my-row'>
<Card 
      className='my-card' 
      title="Current Balance" 
      bordered={true}><p>₹ {balance}</p>
      <Button text="Reset Balance" blue="true" onClick={handleResetBalance} /></Card>

<Card 
      className='my-card' 
      title="Current Expense" 
      bordered={true}><p>₹ {expense}</p>
      <Button text="Add Expense" blue="true" onClick={showExpenseModal} /></Card>

<Card 
      className='my-card'  
      title="Current Income" 
      bordered={true}><p>₹ {income}</p>
      <Button text="Add Income" blue="true" onClick={showIncomeModal} /></Card>
    </Row>

    <Modal
        title="Confirmation"
        open={showConfirmationModal}
        onOk={resetBalance}
        onCancel={handleCancelReset}
      >
        <p>Are you sure you want to reset the balance?</p>
      </Modal>
    </div>
  )
}

Cards.propTypes = {
  showExpenseModal: PropTypes.func.isRequired,
  showIncomeModal: PropTypes.func.isRequired,
  income: PropTypes.number.isRequired,
  expense: PropTypes.number.isRequired,
  balance: PropTypes.number.isRequired,
  resetBalance: PropTypes.func.isRequired,
};

export default Cards;