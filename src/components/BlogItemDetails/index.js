// Write your JS code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

class BlogItemDetails extends Component {
  state = {listEl: [], isLoading: true}

  componentDidMount() {
    this.fetchDetailsList()
  }

  fetchDetailsList = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const response = await fetch(`https://apis.ccbp.in/blogs/${id}`)
    const fetchDetails = await response.json()
    const fetchResult = {
      id: fetchDetails.id,
      author: fetchDetails.author,
      avatarUrl: fetchDetails.avatar_url,
      content: fetchDetails.content,
      imageUrl: fetchDetails.image_url,
      title: fetchDetails.title,
      topic: fetchDetails.topic,
    }
    this.setState({listEl: fetchResult, isLoading: false})
  }

  render() {
    const {listEl, isLoading} = this.state
    const {title, avatarUrl, author, imageUrl, content} = listEl
    return isLoading ? (
      <div data-testid="loader" className="container">
        <Loader type="TailSpin" color="#00bfff" height={50} width={50} />
      </div>
    ) : (
      <div className="blogsDetailsContainer">
        <h1 className="heading">{title}</h1>
        <div className="container">
          <img src={avatarUrl} className="avatarIamge" alt={author} />
          <p className="authorPara">{author}</p>
        </div>
        <img src={imageUrl} className="image" alt={`${title}`} />
        <p className="contentPara">{content}</p>
      </div>
    )
  }
}
export default BlogItemDetails
