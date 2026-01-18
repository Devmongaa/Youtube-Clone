import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
mongoose.plugin(mongooseAggregatePaginate);

const videoSchema = new mongoose.Schema({
    title: {
        type:String,
        required: true,
        trim:true,
        index:true
    },
    description: {
        type:String,
        required: true,
        trim:true,
    },
    videoFile: {
        type:String, //cloudinary url
        required: true,
    },
    thumbnailUrl: {
        type:String, //cloudinary url
        required: true,
    },
    views: {
        type:Number,
        default:0
    },
    likes: {
        type:[mongoose.Schema.Types.ObjectId],
        ref: "User",
        default: []
    },
    isPublished: {
        type:Boolean,
        default:true
    },
    dislikes: {
        type:[mongoose.Schema.Types.ObjectId],
        ref: "User",
        default: []
    },
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
}, { timestamps: true
})

export const Video = mongoose.model("Video", videoSchema)