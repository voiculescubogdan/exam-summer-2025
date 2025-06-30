import express from 'express'
import controllers from '../controllers/index.js'
import middleware from '../middleware/index.js'

const apiRouter = express.Router()

apiRouter.use(middleware.auth)

apiRouter.get('/users', controllers.user.suggestUser)

apiRouter.get('/subscriptions', controllers.subscription.getSubscriptions)
apiRouter.post('/subscriptions', controllers.subscription.subscribe)
apiRouter.delete('/subscriptions/:subscriptionId', controllers.subscription.unsubscribe)
apiRouter.get('/subscriptions/sorted', controllers.subscription.sortSubscriptions)
apiRouter.get('/subscriptions/filtered', controllers.subscription.filterSubscriptions);

apiRouter.post('/posts/add-post', controllers.post.addPost)
apiRouter.get('/posts', controllers.post.getAllPosts)
apiRouter.patch('/posts/edit-post/:pid', controllers.post.editPost)
apiRouter.delete('/posts/delete-post/:pid', controllers.post.deletePost)
apiRouter.get('/post/:pid', controllers.post.getPost)

export default apiRouter
