import React, { useState, useContext, useEffect } from 'react'
import './Subscriptions.css'
import UserCardList from '../UserCardList'
import AppContext from '../../state/AppContext'

const Subscriptions = () => {
  const globalState = useContext(AppContext)

  const [subscriptionData, setSubscriptionData] = useState([])
  console.log(subscriptionData);

  useEffect(() => {
    const searchSuccessListener = globalState.subscriptions.emitter.addListener('SUBSCRIPTION_SEARCH_SUCCESS', () => {
      setSubscriptionData(globalState.subscriptions.subscriptions)
    })

    return () => {
      searchSuccessListener.remove()
      globalState.subscriptions.clearSubscriptions()
    }
  }, [])

  useEffect(() => {
    globalState.subscriptions.getSubscriptions(globalState)
  }, [])

  function handleSortByName() {
    setSubscriptionData((prevData) => {

      const newData = [...prevData];
      console.log(newData);

      return newData.sort((a, b) => a.subscribed.name.localeCompare(b.subscribed.name));
    })
  }

  function handleSortByUsername() {
    setSubscriptionData((prevData) => {

      const newData = [...prevData];
      console.log(newData);

      return newData.sort((a, b) => a.subscribed.username.localeCompare(b.subscribed.username));
    })
  }

  function handleFilterByName(name) {
    setSubscriptionData((prevData) => {
      const newData = [...prevData];

      return newData.filter((valueName) => !valueName.subscribed.name.localeCompare(name))
    })
  }

  function handleFilterByUsername(username) {
    setSubscriptionData((prevData) => {
      const newData = [...prevData];

      return newData.filter((valueName) => !valueName.subscribed.username.localeCompare(username))
    })
  }

  return (
    <div className="subscriptions-container">
      <div className="page-title">
        <h2>Subscriptions</h2>
        <p>who are you listening to?</p>
      </div>
      <button onClick={handleSortByName}>Sort By Name</button>
      <button onClick={handleSortByUsername}>Sort By Username</button>
      <button onClick={() => handleFilterByName('alex')}>Filter by Name</button>
      <button onClick={() => handleFilterByUsername('cristina')}>Filter by Username</button>
      <UserCardList
        data={subscriptionData.map((subscription, index) => ({
          ...subscription.subscribed,
        }))}
      />
    </div>
  )
}

export default Subscriptions
