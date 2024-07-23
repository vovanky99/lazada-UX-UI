<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use App\Models\Categories;
use App\Models\Languages;
use Exception;

class CategoriesController extends Controller
{

    /* create category */
    public function store(Request $request){
        $name_vi = $request->name_vi;
        $name_en = $request->name_en;
        $parent_id = $request->parent_id;
        $slug_vi = Str::slug($name_vi);
        $slug_en = Str::slug($name_en);
        $type = $request->type;

        $checkTitle = Categories::with(['categories_translation'=>function($query) use( $name_en,$name_vi){
            $query->where('name',$name_vi)->orWhere('name',$name_en);
        }])->first();
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
                
                $category = Categories::create([
                    '_lft'=> $parent->_lft +1,
                    '_rgt'=> $parent->_lft +2,
                    'type'=>$type,
                    'parent_id'=>$parent_id,
                ]);
                $category->categories_translation()->createMany([[
                    'name'=>$name_vi,
                    'slug'=>$slug_vi,
                    'language_id'=>1,
                ],[
                    'name'=>$name_en,
                    'slug'=>$slug_en,
                    'language_id'=>2,
                ]]);
            }
            else{
                $parent = Categories::orderBy('_rgt','DESC')->first();
                if($parent){
                    $_rgt =  $parent->_rgt;
                }
                else{
                    $_rgt = 0;
                }
                $category = Categories::create([
                    '_lft'=>$_rgt+1,
                    '_rgt'=>$_rgt+2,
                    'type'=>$type,
                ]);
                $category->categories_translation()->createMany([[
                    'name'=>$name_vi,
                    'slug'=>$slug_vi,
                    'language_id'=>1,
                ],[
                    'name'=>$name_en,
                    'slug'=>$slug_en,
                    'language_id'=>2,
                ]]);
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
                $cat->
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
    public function index(Request $request,$language = 'en'){
        $name = $request->get('name');
        $parent_id = $request->get('parent_id');
        $status = $request->get('status');
        $type = $request->get('type');

        /* check language in db and return lang */
        if(count(Languages::where('acronym',$language)->get()) ==0){
           $language = 'en';
           $lang = Languages::where('acronym',$language)->first();
        }
        else{
            $lang = Languages::where('acronym',$language)->first();
        }

        $cat = DB::table('categories')->join('categories_translation as cat_trans','cat_trans.category_id','=','categories.id')->join('languages','cat_trans.language_id','=','languages.id')->leftJoin('categories as cat_parent','cat_parent.id','=','categories.parent_id')->where('cat_trans.name','like',$name.'%')->select('categories.*','cat_parent.id as parent_id',DB::raw("(select categories_translation.name from categories_translation where cat_parent.id = categories_translation.category_id and language_id = $lang->id ) as parent_name"),'cat_trans.name as cat_name')->where('cat_trans.language_id',$lang->id);

        if($type){
            $cat->where('categories.type',$type);
        }
        
        if($parent_id){
            $cat->where('categories.parent_id',$parent_id);
        }
        if($status=='1'||$status=='0'){
            $cat->where('categories.status',$status);
        }
        $cats = $cat->get();
        return response()->json($cats);
    }

    public function show($id){
        $cat = Categories::where('id',$id)->with(['parent','categories_translation','images'])->first();
        return response()->json($cat);
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
    public function TodoListCat(){
        $name = request()->get('name');
        $id = request()->get('id');
        if($id){
            $cat = Categories::whereNotIn('id',$id)->where('name','like','%'.$name.'%')->get();
        }
        else{
            $cat = Categories::where('name','like','%'.$name.'%')->get();
        }
        return response()->json($cat);
    }
}