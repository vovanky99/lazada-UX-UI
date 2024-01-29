<?php
use App\Models\Reviews;

function get_AvgReviewsStars($products_id){
    return Reviews::where('products_id',$products_id)->avg('reviews_stars');
}