import commentService from "../services/commentService";

let handleGetAllComment = async(req, res) => {
    let message = await commentService.getAllCommentsByHandBook(req.query.handbookId)
    return res.status(200).json(message)
}



let handleCreateNewComment = async (req, res) => {
    let message = await commentService.createNewComment(req.body)
    return res.status(200).json(message)
}


let handleUpdateComment = async (req, res) => {
    
    let message =  await commentService.updateCommentByUser(req.body)
    return res.status(200).json(message)
}

let handleDeleteComment = async (req, res) => {
    
    if (!req.query.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: `Missing required parameters!` 
        })
    }
    let message = await commentService.deleteCommentByUser(req.query.id)
    return res.status(200).json(message)
}

module.exports = {
    handleGetAllComment: handleGetAllComment,
    handleCreateNewComment: handleCreateNewComment,
    handleUpdateComment: handleUpdateComment,
    handleDeleteComment: handleDeleteComment
}