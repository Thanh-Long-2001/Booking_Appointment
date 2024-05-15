import db from "../models/index";

let createNewComment = (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            await db.Comment.create({
                userId: data.userId,
                handbookId: data.handbookId,
                value: data.value,
                parentId: data.parentId
            })
            resolve({
                errCode: 0,
                errMessage: 'OK',
                
            })
        } catch (e) {
            reject(e)
        }
        
    })
}


let getAllCommentsByHandBook = async (handbookId) => {
    try {
        return await new Promise(async (resolve, reject) => {
            try {
                if (!handbookId) {
                    resolve({
                        errCode: 1,
                        errMessage: 'Missing parameter handbookId'
                    });
                } else {
                    
                    let data = await db.Comment.findAll({
                        where: {
                            handbookId: handbookId
                        },
                        order: [['createdAt', 'DESC']],
                        include: [
                            {
                                model: db.User,
                                as: "commentUser",
                                
                                attributes: ['email', 'firstName', 'lastName'],
                            },
                        ],
                        raw: false, 
                        nest: true
                    });

                    resolve({
                        errCode: 0,
                        data
                    });
                }
            } catch (e) {
                reject(e);
            }
        });
    } catch (error) {
        console.error('Error:', error);
    }
}


let updateCommentByUser = (data) => {
    return new Promise(async(resolve, reject) => {
        if(!data.id) {
            resolve ({
                errCode: 1,
                errMessage: 'Missing parameter commentId'
            })
        } else {
            let comment = await db.Comment.findOne({
                where: {
                    id: data.id
                },
                raw: false
            })

            if (comment) {
                comment.value = data.value
                

                await comment.save()
                
                resolve({
                    errCode: 0,
                    message: 'Update the comment succeed!'
                })
            }
            else{
                resolve({
                    errCode: 2,
                    errMessage: 'Comment is not found!'
                });
            }
           
        }
    })
}

let deleteCommentByUser = async (id) => {
    try {
        let comment = await db.Comment.findOne({
            where: { id: id}
        });
        
        if (!comment) {
            return {
                errCode: 2,
                errMessage: 'The comment does not exist!'
            };
        } else {
            // Tìm và xóa tất cả các comment con của comment đã được xóa
            await deleteRecursiveComments(id);

            // Xóa comment đã được xóa
            await db.Comment.destroy({
                where: { id: id }
            });

            return {
                errCode: 0,
                message: 'Delete the comment succeed!'
            };
        }
    } catch (error) {
        return {
            errCode: 1,
            errMessage: 'An error occurred while deleting the comment!'
        };
    }
};

let deleteRecursiveComments = async (commentId) => {
    // Tìm tất cả các comment con của comment có id là commentId
    let childComments = await db.Comment.findAll({
        where: { parentId: commentId }
    });

    // Lặp qua từng comment con và xóa nó và tất cả các comment con của nó
    for (let childComment of childComments) {
        await deleteRecursiveComments(childComment.id);
        await db.Comment.destroy({
            where: { id: childComment.id }
        });
    }
};

module.exports = {
    createNewComment: createNewComment,
    getAllCommentsByHandBook: getAllCommentsByHandBook,
    updateCommentByUser: updateCommentByUser,
    deleteCommentByUser: deleteCommentByUser
}