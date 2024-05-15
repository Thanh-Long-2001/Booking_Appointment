import React, { Component } from 'react';
import { connect } from "react-redux";
import './DetailHandBook.scss'
import { LANGUAGES } from '../../../utils'
import { FormattedMessage } from 'react-intl';
import HomeHeader from '../../HomePage/Section/HomeHeader/HomeHeader';
import {getDetailHandbookByIdService, getAllComment, 
    createNewComment, 
    updateCommentByUser, 
    deleteCommentByUser} from '../../../services/userService'
import _ from 'lodash';
import { IoMdSend } from "react-icons/io";
import moment from 'moment';
class DetailHandBook extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataDetailHandbook: {},
            handbookId: null,
            textComment: "",
            allComment: [],
            parentId: 0,
            commentVisibility: {},
            commentToEdit: null, 
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id
            let handbookId = parseInt(id, 10)
            let res = await getDetailHandbookByIdService({
                id: id,
            })
            let dataComment = await getAllComment(id)
  
            if (res && res.errCode === 0) {
                let data = res.data

                this.setState({
                    dataDetailHandbook: data,
                    handbookId: handbookId,
                    allComment: dataComment.data
                })
            }

            
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        
    }

    

     // Comments
    createNewComment = async (userId) => {
        try {
            const { textComment } = this.state;
            if(textComment.trim() !== '') {
                let data = {
                    userId: userId,
                    handbookId: this.state.handbookId,
                    value: this.state.textComment,
                    parentId: this.state.parentId,
                }
                await createNewComment(data);
                let dataComment = await getAllComment(data.handbookId)
                this.setState({
                    textComment: "",
                    allComment: dataComment.data
                })
            }
        // Xử lý kết quả
        } catch (error) {
        console.error("Error creating comment:", error);
        }
    };

    // Trả lời comment
    

    // Sửa comment
    updateComment = async () => {
        const { textComment, commentToEdit } = this.state;

        if (textComment.trim() !== "" && commentToEdit) {
            let data = {
                id: commentToEdit,
                value: textComment
            }

  
            await updateCommentByUser(data);
            let dataComment = await getAllComment(this.state.handbookId)
            // Clear textarea và commentToEdit sau khi cập nhật
            this.setState({
                textComment: "",
                commentToEdit: null,
                allComment: dataComment.data
            });
        } else {
            // Xử lý logic nếu textComment rỗng hoặc không có commentToEdit
            console.log("Text comment is empty or no comment to edit!");
        }
    };

    // Xóa comment
    deleteComment = async (commentId) => {
       
        await deleteCommentByUser(commentId);
        // Xử lý kết quả
        let dataComment = await getAllComment(this.state.handbookId)
            // Clear textarea và commentToEdit sau khi cập nhật
            this.setState({
                textComment: "",
                allComment: dataComment.data
            });
        
    };

    handleCommentChange = (e) => {
        this.setState({ textComment: e.target.value });
    };

    handleReply = (parentId, userId) => {
        // Cập nhật state hoặc thực hiện bất kỳ hành động nào bạn muốn ở đây
        // Ví dụ: cập nhật parentId của form text và focus vào form text
        this.setState({ 
           
            parentId: parentId 
        });
        
        this.textareaRef.focus();
        const { textComment } = this.state;

    // Tạo new comment nếu textComment không rỗng
        if (textComment.trim() !== "") {
            this.createNewComment(userId);
        } else {
            // Xử lý logic nếu textComment rỗng
            console.log("Text comment is empty!");
        }
    };

    toggleCommentVisibility = (commentId) => {
        this.setState(prevState => ({
            commentVisibility: {
                ...prevState.commentVisibility,
                [commentId]: !prevState.commentVisibility[commentId]
            }
        }));
    };

    editComment = (commentId, commentValue) => {
        // Set giá trị comment cần chỉnh sửa vào textarea
        this.setState({
            textComment: commentValue,
            commentToEdit: commentId
        });
        // Focus vào textarea
        this.textareaRef.focus();
    };

    render() {
        let { dataDetailHandbook, textComment, allComment } = this.state
        let {userInfo} = this.props
        let userId = userInfo.id
        // Xây dựng cây dữ liệu từ tất cả các comment
        const buildCommentTree = (comments) => {
            const commentMap = {};
            const rootComments = [];
        
            comments.forEach(comment => {
                commentMap[comment.id] = { ...comment, children: [], isChild: comment.parentId !== "0" };
            });
        
            comments.forEach(comment => {
                if (comment.parentId === "0" || !commentMap[comment.parentId]) {
                    rootComments.push(commentMap[comment.id]);
                } else {
                    commentMap[comment.parentId].children.push(commentMap[comment.id]);
                }
            });
        
            return rootComments;
        };
        
        const renderCommentTree = (comment) => (
            <div key={comment.id} className={`comment-all ${comment.isChild ? 'child-comment' : ''}`}>
                <div className="comment-info">
                    <p>{comment.commentUser.firstName} {comment.commentUser.lastName}</p>
                    <p>{comment.value}</p>
                    {comment.userId === `${userId}` && (
                        <div className="comment-actions">
                            <div onClick={() => this.editComment(comment.id, comment.value)} >Sửa</div>
                            <div onClick={() => this.deleteComment(comment.id)} style={{ marginLeft: '5px' }}>Xóa</div>
                        </div>
                    )}
                </div>
                <span>{moment(comment.createdAt).format('YYYY-MM-DD HH:mm')}</span>
                
                {/* Hiển thị nút sửa và xóa comment nếu là comment của người dùng hiện tại */}
                
                <span onClick={() => this.handleReply(comment.id, userId)} style={{ cursor: 'pointer' }}>Phản hồi</span>
                {comment.children && comment.children.length > 0 && (
                    <span className='seen-reply' onClick={() => this.toggleCommentVisibility(comment.id)} style={{ cursor: 'pointer' }}>
                        Xem {comment.children.length} phản hồi
                    </span>
                )}
                {comment.children && comment.children.length > 0 &&
                    (this.state.commentVisibility[comment.id] ? comment.children.map(child => renderCommentTree(child)) : null)
                }
                
            </div>
        );
    
        const commentTree = buildCommentTree(allComment);
        return (
            <div className='detail-handbook-container'>
                <HomeHeader />
                <div className='desc-handbook'>
                        {dataDetailHandbook && !_.isEmpty(dataDetailHandbook) &&
                            <>
                                <div className='content-handbook'>
                                    <div className='content-head'>
                                        <div className='name-head'>{dataDetailHandbook.name}</div>
                                    </div>
                                    <div dangerouslySetInnerHTML={{ __html: dataDetailHandbook.descriptionHTML }}></div>
                                </div>
                            </>
                        }
                </div>
                <div className='comment'>
                    <textarea className='formComment'
                        ref={(ref) => { this.textareaRef = ref; }}
                        placeholder="Type your comment..."
                        value={textComment}
                        onChange={this.handleCommentChange}
                    />
                    <button className="btn-send" onClick={this.state.commentToEdit ? this.updateComment : () => this.createNewComment(userId)}><IoMdSend className='child'/></button>
                </div>
                <div className="comment-section">
                    {commentTree.map(comment => renderCommentTree(comment))}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {    
        language: state.app.language,
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailHandBook);
