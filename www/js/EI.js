var EI = (function (my) {

    //
    my.sSysInfo = function() {
        this.SvcName = "1";
        this.Msg = "";
        this.Flag = 0;
        this.Sender = "";
        this.UUID = "";
    };

    my.sDataColumn = function(colName, dataType, colCaption) {
        this.Name = colName;
        this.Caption = colCaption || "C" + colName;
        //this.PrimaryKey = false;
        this.DataType = dataType || "S";
    };


    my.sDataTable = function () {
        this.Columns = new Array();

        this.Rows = new Array();

        if (typeof my.sDataTable._initialized == "undefined" && this instanceof my.sDataTable) {
            my.sDataTable.prototype.addColum = function (colName, dataType, colCaption) {
                if (this instanceof my.sDataTable) {
                    this.Columns.push(new my.sDataColumn(colName, dataType, colCaption));
                }
            };
            my.sDataTable.prototype.addColums = function (colNames) {
                if (this instanceof my.sDataTable) {
                    for (var arg in arguments) {
                        this.Columns.push(new my.sDataColumn(arguments[arg]));
                    }
                }
            };
            my.sDataTable.prototype.addRows = function (rows) {
                if (this instanceof my.sDataTable) {
                    for (var arg in arguments) {
                        this.Rows.push(arguments[arg]);
                    }
                }
            };
            my.sDataTable.prototype.addOneRow = function (cells) {
                if (this instanceof my.sDataTable) {
                    var row = new Array();
                    for (var arg in arguments) {
                        row.push(arguments[arg]);
                    }
                    this.Rows.push(row);
                }
            };
            my.sDataTable._initialized = true;
        }
    };


    my.EIinfo=function() {
        this.SysInfo = new my.sSysInfo();
        this.Tables = new Array();

        if (typeof my.EIinfo._initialized == "undefined" && this instanceof my.EIinfo) {
            my.EIinfo.prototype.add = function () {
                if (this instanceof my.EIinfo) {
                    for (var arg in arguments) {
                        this.Tables.push(arguments[arg]);
                    }
                    if(arguments.length == 0)
                        this.Tables.push(new my.sDataTable());
                }
            };
            my.EIinfo._initialized = true;
        }
    };

    /* ********** ********** **********
     * 将json风格的Tables转为C#风格
     * EIInof2Tables ==> TablesCStoJS
     * *********** ********** **********/
    my.TablesCStoJS = function(csTables) {
        var jsTables = new Array();

        for (var ktable in csTables) {
            var Table = new Object();
            Table.Table = new Array();
            for (var krow in csTables[ktable].Rows) {
                var colIndex = 0;
                var xrow = new Object();
                for (var kcol in csTables[ktable].Columns) {
                    xrow[csTables[ktable].Columns[kcol].Name] = csTables[ktable].Rows[krow][colIndex];
                    colIndex++;
                }
                Table.Table.push(xrow);
            }
            jsTables.push(Table);
        }
        return jsTables;
    };

    /* ********** ********** **********
     * 将json风格的EIInfo转为C#风格
     * *********** ********** **********/
    my.EIInfoCStoJS = function(csEIInfo) {
        var jsEIInfo = new Object();

        jsEIInfo.SysInfo = csEIInfo.SysInfo;
        jsEIInfo.Tables = my.TablesCStoJS(csEIInfo.Tables);

        return jsEIInfo;
    };


    /* ********** ********** **********
    * 将json风格的EIInfo转为C#风格
    * *********** ********** **********/
    my.EIInfoJStoCS = function (jsEIInfo) {
        var csEIInfo = new Object();
        csEIInfo.SysInfo = jsEIInfo.SysInfo;
        csEIInfo.Tables = new Array();

        jsEIInfo.Tables.forEach(function (ptable) {//表循环
            var table = new Object();
            //取得列数组对象
            table.Columns = new Array()
            var row0 = ptable.Table[0];
            for (var att in row0) {//循环第一行的所有属性，取得列名
                if (att == "$$hashKey") continue;
                if (typeof (row0[att]) == "function") {
                    ;// 方法
                } else {
                    //属性
                    table.Columns.push({ Name: att });
                }
            }

            //取得行数组对象
            table.Rows = new Array();
            ptable.Table.forEach(function (prow) {//行循环
                var row = new Array();
                for (var att in prow) {//循环第一行的所有属性，取得列名
                    if (att == "$$hashKey") continue;
                    if (typeof (prow[att]) == "function") {
                        ;// 方法
                    } else {
                        //属性
                        row.push(prow[att]);
                    }
                }
                table.Rows.push(row);
            })
            csEIInfo.Tables.push(table);
        });
        return (csEIInfo);
    };

    return my;
}(EI || {}));
