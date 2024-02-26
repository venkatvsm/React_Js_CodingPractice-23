// Write your JS code here
import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

class BlogList extends Component {
  state = {listEl: [], isLoading: true}

  componentDidMount() {
    this.fetchedDetails()
  }

  fetchedDetails = async () => {
    const response = await fetch('https://apis.ccbp.in/blogs')
    const fetchDetails = await response.json()
    const fetchResult = fetchDetails.map(eachItem => ({
      id: eachItem.id,
      author: eachItem.author,
      avatarUrl: eachItem.avatar_url,
      imageUrl: eachItem.image_url,
      title: eachItem.title,
      topic: eachItem.topic,
    }))
    this.setState({listEl: fetchResult, isLoading: false})
  }

  render() {
    const {listEl, isLoading} = this.state
    return (
      <ul className="blogListContainer">
        {isLoading ? (
          <div data-testid="loader">
            <Loader type="TailSpin" color="#00bfff" height={50} width={50} />
          </div>
        ) : (
          listEl.map(eachItem => (
            <Link
              className="linkContainer"
              to={`/blogs/${eachItem.id}`}
              key={eachItem.id}
            >
              <li className="blogList_itemsContainer">
                <img
                  src={eachItem.imageUrl}
                  className="blogListImage"
                  alt={eachItem.title}
                />
                <p className="blogList_topic">{eachItem.topic}</p>
                <h1 className="blogList_title">{eachItem.title}</h1>
                <div className="blogList_container">
                  <img
                    src={eachItem.avatarUrl}
                    alt={eachItem.title}
                    className="blogList_authorImage"
                  />
                  <p className="blogList_author">{eachItem.author}</p>
                </div>
              </li>
            </Link>
          ))
        )}
      </ul>
    )
  }
}
export default BlogList
