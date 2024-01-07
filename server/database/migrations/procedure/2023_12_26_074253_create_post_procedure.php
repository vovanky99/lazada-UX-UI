<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class CreatePostProcedure extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        $procedure_get_table = "DROP PROCEDURE IF EXISTS `get_table`;
        CREATE PROCEDURE `get_table` (tables_name1 text,tables_name2 text,tables_name3 text)
        BEGIN
        SELECT Table_name from information_schema.tables where table_schema = 'lazada_db' AND Table_name != 'failed_jobs' AND TABLE_NAME != 'migrations' AND TABLE_NAME != 'password_reset_tokens' AND TABLE_NAME != 'personal_access_tokens' AND TABLE_NAME != tables_name1 AND TABLE_NAME != tables_name2 AND TABLE_NAME != tables_name3 ;
        END";
        $createCat = "DROP PROCEDURE IF EXISTS `create_cat`;
        CREATE PROCEDURE `create_cat` (title_child text,isParent_id int)
        BEGIN
        SELECT @myright := _rgt from categories where id = isParent_id;
        UPDATE categories set  _lft=_lft+2 where _lft>@myright;
        UPDATE categories set _rgt=_rgt+2 where _rgt>=@myright;
        INSERT into categories(title,_lft,_rgt,parent_id) values(title_child,@myright ,@myright + 1,isParent_id);
        END";
        $createCatnotchild = "DROP PROCEDURE IF EXISTS `create_cat_not_child`;
        CREATE PROCEDURE `create_cat_not_child` (title_cat text)
        BEGIN
        SELECT @myright := MAX(_rgt) from categories;
        INSERT into categories(title,_lft,_rgt) values(title_cat,@myright + 1,@myright + 2);
        END";
        $updateCat="DROP PROCEDURE IF EXISTS `update_cat`;
        CREATE PROCEDURE `update_cat` (update_id int,isParent_id int,oldParent_id)
        BEGIN
        SELECT @myleft:=_lft,@myright:=_rgt,@mywidth:=_rgt - _lft + 1 from categories where id =update_id;
        
        UPDATE categories set _lft=_lft - @mywidth where _lft>@myright;
        UPDATE categories set _rgt=_rgt - @mywidth where _rgt>@myright;
        END";
        $deleteCat="DROP PROCEDURE IF EXISTS `delete_cat`;
        CREATE PROCEDURE `delete_cat` (delete_id int)
        BEGIN
        SELECT @myleft:=_lft,@myright:=_rgt,@mywidth:=_rgt - _lft + 1 from categories where id=delete_id;
        DELETE from categories where _lft between @myleft and @myright;
        UPDATE categories set  _lft=_lft - @mywidth where _lft>@myright;
        UPDATE categories set _rgt=_rgt - @mywidth where _rgt>@myright;
        END";
        DB::unprepared($procedure_get_table);
        DB::unprepared($createCat);
        DB::unprepared($createCatnotchild);
        // DB::unprepared($updateCat);
        DB::unprepared($deleteCat);
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
       
    }
};