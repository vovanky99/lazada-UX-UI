<?php 
namespace App\Http\Controllers\Seller;

use App\Http\Controllers\Controller;
use App\Models\Address;
use App\Models\EmailReceiveElectronicInvoice;
use App\Models\IdentityInfo;
use App\Models\Seller;
use App\Models\Shop;
use App\Models\ShopShippingMethod;
use App\Models\TaxShop;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProfileController extends Controller {
    public function RegisterShop(Request $request,$type){
        $type = $request->type;
        $shop= Shop::where('seller_id',Auth::user()->id)->first();
        try{
            if($type === 'shop_info'){
                $shopname = $request->shop_name;
                $address = $request->address;
                $ward_id = $request->ward_id;
                $phone = $request->phone;
                $fullname = $request->fullname;
                if(!$shop){
                    $NewShop = Shop::create([
                        'name'=>$shopname,
                        'seller_id'=>Auth::user()->id,
                        'status'=>0,
                    ]);
                    $address = Address::create([
                        'street_address'=>$address,
                        'ward_id'=>$ward_id,
                        'phone'=>$phone,
                        'name'=>$fullname,
                        'addressable_type'=>Shop::class,
                        'addressable_id'=>$NewShop->id,
                    ]);
                    $NewShop->update([
                        'address_id'=>$address->id,
                    ]);
                    $NewShop->seller()->update([
                        'shop_id'=>$NewShop->id,
                    ]);
                    return response()->json(['success'=>'create success!']);
                }
                else{
                    $shop->update([
                        'name'=>$shopname,
                    ]);
                    $shop->address()->update([
                        'street_address'=>$address,
                        'ward_id'=>$ward_id,
                        'phone'=>$phone,
                        'name'=>$fullname,
                    ]);
                    return response()->json(['success'=>'updated success!']);
                }
                
            }
            else if($type==="setting_shipping"){
                $express = $request->express;
                $fast = $request->fast;
                $saving = $request->saving;
                $heavy_things = $request->heavy_things;
                $d = (array)$request->cod;
                $newArray = [];
                foreach($d as $key =>$value){
                    $newArray[$key] = $value;
                }
                $cod = (object)$newArray;
                if(!$shop->shop_shipping_methods){
                    Shop::where('seller_id',Auth::user()->id)->firstOrFail()->shop_shipping_methods()->createMany([
                        [
                            'shipping_method_id'=>1,
                            'cod'=>$cod->express?1:0,
                            'status'=>$express?1:0,
                        ],
                        [
                            'shipping_method_id'=>2,
                            'cod'=>$cod->fast?1:0,
                            'status'=>$fast?1:0,
                        ],
                        [
                            'shipping_method_id'=>3,
                            'cod'=>$cod->saving?1:0,
                            'status'=>$saving?1:0,
                        ],
                        [
                            'shipping_method_id'=>4,
                            'cod'=>$cod->heavy_things?1:0,
                            'status'=>$heavy_things?1:0,
                        ]
                    ]);
                    return response()->json(['success'=>'created success!']);
                }
                else{
                    $shop_shipping = ShopShippingMethod::where('shop_id',$shop->id)->get();
                    foreach($shop_shipping as $s){
                        if($s->shipping_method_id ==1){
                            $s->cod=$cod->express?1:0;
                            $s->status=$express?1:0;
                            $s->save();
                        }
                        if($s->shipping_method_id ==2){
                            $s->cod=$cod->fast?1:0;
                            $s->status=$fast?1:0;
                            $s->save();
                            
                        }
                        if($s->shipping_method_id ==3){
                            $s->cod=$cod->saving?1:0;
                            $s->status=$saving?1:0;
                            $s->save();
                        }
                        if($s->shipping_method_id ==4){
                            $s->cod=$cod->heavy_things?1:0;
                            $s->status=$heavy_things?1:0;
                            $s->save();
                        }
                    }
                    return response()->json(['success'=>'updated success!']);
                }
               
            }
            else if($type==="tax_info"){
                $business_type = $request->business_type;
                $business_name = $request->business_name;
                $tax_ward_id = $request->ward_id;
                $tax_address = $request->address;
                $tax_code = $request->tax_code;
                $email =  $request->email;
                if(!$shop->tax_shop && !count(Auth::user()->identity_info)){
                    $taxShop = TaxShop::create([
                        'business_name'=>$business_name,
                        'type'=>$business_type,
                        'tax_code'=>$tax_code,
                        'shop_id'=>$shop->id,
                    ]);
                    $address = Address::create([
                        'addressable_type'=>TaxShop::class,
                        'addressable_id'=>$taxShop->id,
                        'street_address'=>$tax_address,
                        'ward_id'=>$tax_ward_id,
                    ]);
                    $taxShop->update([
                        'registered_business_address_id'=> $address->id,
                    ]);
                    $new_email = explode(',',$email);
                    foreach($new_email as $key =>$value){
                        $taxShop->email_receive_electronic_invoice()->create([
                            'email'=>$value,
                        ]);
                    }
                    return response()->json(['success'=>'created success!']);
                }
            }
            else if($type === "identity_info"){
                    $form_type = $request->form_of_identity;
                    $identity_number = $request->identity_number;
                    $seller_fullname = $request->fullname;
                    $uploadImages = $request->upload_images;
                    $uploadHoldImages = $request->upload_hold_images;
                    if(!count(Auth::user()->identity_info)){
                        IdentityInfo::create([
                            'type'=>$form_type,
                            'identity_number'=>$identity_number,
                            'fullname'=>$seller_fullname,
                            'identity_image'=>$uploadImages,
                            'identity_hold_image'=>$uploadHoldImages,
                            'identitiesable_id'=>Auth::user()->id,
                            'identitiesable_type'=>Seller::class,
                        ]);
                        $shop->update([
                            'status'=>1,
                        ]);
                        return response()->json(['success'=>'created success!']);
                    }
                    else{
                        IdentityInfo::where('identitiesable_id',Auth::user()->id)->firstOrFail()->update([
                            'type'=>$form_type,
                            'identity_number'=>$identity_number,
                            'fullname'=>$seller_fullname,
                            'identity_image'=>$uploadImages,
                            'identity_hold_image'=>$uploadHoldImages,
                        ]);
                        return response()->json(['success'=>'updated success!']);
                    }
            }
            else{
                return response()->json(['error'=>["type doesn't exists"]]);
            }
        }
        catch(Exception $e){
            return response()->json($e);
        }
    }
}