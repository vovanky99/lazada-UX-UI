<?php 

namespace App\Repositories;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Pagination\Paginator ;

class PaginateRepository {
    public function create($items,$perPage = 15,$page =null,$options = [],$request){
        
	$page = $page ?: (Paginator::resolveCurrentPage() ?: 1);

	$items = $items instanceof Collection ? $items : Collection::make($items);

	return new LengthAwarePaginator($items->forPage($page, $perPage), $items->count(), $perPage, $page, $options);
	
    }
}