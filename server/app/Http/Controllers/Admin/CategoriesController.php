<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use App\Models\Categories;
use Exception;

class CategoriesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $name = $request->name;
        $parent_id = $request->parent_id;
        $status = $request->status;
        $cat = DB::table('categories')->where('name','like',$name.'%');
        if($parent_id){
            $cat->where('parent_id',$parent_id);
        }
        if($status){
            $cat->where('status',$status);
        }

       $cat->get();

       return response()->json($cat);
    }

    /* create category */
    public function store(Request $request){
        $name = $request->name;
        $parent_id = $request->parent_id;
        $slug = Str::slug($name);
        $checkTitle = Categories::where('name',$name)->first();
        if(!$checkTitle){
            if($parent_id){
                $parent = Categories::find($parent_id);

                //update _lft for cat
                $updateNode = DB::table('categories')->where('_lft','>',$parent->_lft)->get();
                if($updateNode){
                    foreach($updateNode as $up){
                        $cat = Categories::find($up->id);
                        $cat->_lft +=2;
                        $cat->save();
                    }
                }

                //update _rgt for cat
                $updateNode = DB::table('categories')->where('_rgt','>',$parent->_lft)->get();
                if($updateNode){
                    foreach($updateNode as $up){
                        $cat = Categories::find($up->id);
                        $cat->_rgt +=2;
                        $cat->save();
                    }
                }


                // create cat
                Categories::create([
                    'name'=>$name,
                    'slug'=>$slug,
                    '_lft'=> $parent->_lft +1,
                    '_rgt'=> $parent->_lft +2,
                    'parent_id'=>$parent_id,
                ]);
            }
            else{
                $parent = Categories::orderBy('_rgt','DESC')->first();
                if($parent){
                    $_rgt =  $parent->_rgt;
                }
                else{
                    $_rgt = 0;
                }
                // create cat
                Categories::create([
                    'name'=>$name,
                    'slug'=>$slug,
                    '_lft'=>$_rgt+1,
                    '_rgt'=>$_rgt+2,
                ]);
            }
            return response()->json(['success'=>'created success!']);
        } 
        else{
            return response()->json(['error'=>'Category already exist!']);
        }
    }
    /* update category */
    public function update(Request $request,$id){
        $name = $request->name;
        $parent_id = $request->parent_id;
        $status = $request->status;
        $slug = Str::slug($name);
        $checkTitle = Categories::where('name',$name)->get();
        $cat = Categories::find($id);
        if(count($checkTitle)<=1 ){
            if($cat->parent_id == $parent_id){
                $cat->update([
                    'name'=>$name,
                    'slug'=>$slug,
                    'status'=>$status,
                ]);
            }
            else{
                // change cat empty to cat have value
                if(!$cat->parent_id && $parent_id){
                    $parent = Categories::find($parent_id);

                    //update _lft for cat
                    $updateNode = DB::table('categories')->where('_lft','>',$parent->_lft)->get();
                    if($updateNode){
                        foreach($updateNode as $up){
                            $cat = Categories::find($up->id);
                            $cat->_lft +=2;
                            $cat->save();
                        }
                    }

                     //update _rgt for cat
                     $updateNode = DB::table('categories')->where('_rgt','>',$parent->_lft)->get();
                     if($updateNode){
                         foreach($updateNode as $up){
                             $cat = Categories::find($up->id);
                             $cat->_rgt +=2;
                             $cat->save();
                         }
                     }

                    // update cat
                    $cat->update([
                        'name'=>$name,
                        'status'=>$status,
                        'slug'=>$slug,
                        '_lft'=>$parent->_lft + 1,
                        '_rgt'=>$parent->_lft + 2,
                    ]);
                }
                else{
                    if($cat->parent_id < $parent_id){
                        $parent = Categories::find($parent_id);
                        $catParentOld = Categories::find($cat->parent_id);

                        // update left node
                        $updateNodeSmall = DB::table('categories')->where('_lft','>=',$catParentOld->_lft)->where('_rgt','<',$parent->_rgt)->get();
                        if($updateNodeSmall){
                            foreach($updateNodeSmall as $up){
                                $cat = Categories::find($up->id);
                                $cat->_rgt -=2;
                                $cat->save();
                            }
                        }
                        //update node for cat larger
                        $updateNode =DB::table('categories')->where('_lft','>',$catParentOld->_lft)->where('_rgt','=<',$parent->_rgt)->get(); 
                        if($updateNode){
                            foreach($updateNode as $up){
                                $cat = Categories::find($up->id);
                                $cat->_lft +=2;
                                $cat->save();
                            }
                        }
                        
                        // update cat
                        $cat->update([
                            'name'=>$name,
                            'status'=>$status,
                            'slug'=>$slug,
                            '_lft'=>$parent->_lft + 1,
                            '_rgt'=>$parent->_lft + 2,
                        ]);
                    }
                    else{
                        $parent = Categories::find($parent_id);
                        //update _lft for cat
                        $updateNode = DB::table('categories')->where('_lft','>',$parent->_lft)->get();
                        if($updateNode){
                            foreach($updateNode as $up){
                                $cat = Categories::find($up->id);
                                $cat->_lft +=2;
                                $cat->save();
                            }
                        }

                        //update _rgt for cat
                        $updateNode = DB::table('categories')->where('_rgt','>',$parent->_lft)->get();
                        if($updateNode){
                            foreach($updateNode as $up){
                                $cat = Categories::find($up->id);
                                $cat->_rgt +=2;
                                $cat->save();
                            }
                        }
                        
                        // update cat
                        $cat->update([
                            'name'=>$name,
                            'status'=>$status,
                            'slug'=>$slug,
                            '_lft'=>$parent->_lft + 1,
                            '_rgt'=>$parent->_lft + 2,
                        ]);
                    }
                }
            }
            return response()->json(['success'=>'created success!']);
        } 
        else{
            return response()->json(['error'=>'Category Name already exist!']);
        }
    }

    /* get category */
    public function getCategory(Request $request){
        $name = $request->get('name');
        $parent_id = $request->get('parent_id');
        $status = $request->get('status');
        $cat = DB::table('categories')->select('categories.*','cat.name as cat_name')->leftJoin('categories as cat','cat.id','=','categories.parent_id')->where('categories.name','like',$name.'%');
        if($parent_id){
            $cat->where('categories.parent_id',$parent_id);
        }
        if($status=='1'||$status=='0'){
            $cat->where('categories.status',$status);
        }
        $cats = $cat->get();
        return response()->json($cats);
    }
    public function delete($id){
        try{
            $cat = Categories::find($id);
            if($cat){
                $update = Categories::where('_rgt','>',$cat->_rgt)->where('_lft','>',$cat->_lft)->get();
                $updateParent = Categories::where('_rgt','>',$cat->_rgt)->where('_lft','<',$cat->_lft)->get();
                $TotalNode = $cat->_rgt - $cat->_lft + 1 ;
                // update for same level and lower level
                foreach($update as $up){
                    $c = Categories::find($up->id);
                    $c->_lft -= $TotalNode;
                    $c->_rgt -= $TotalNode;
                    $c->save();
                }
                //update for parent
                foreach($updateParent as $up){
                    $c = Categories::find($up->id);
                    $c->_rgt-=$TotalNode;
                    $c->save();
                }
                $cat->delete();
            }
            return response()->json(['success'=>'deleted success!']);
        }
        catch(Exception $e){
        return response()->json($e);
        }
    }
}