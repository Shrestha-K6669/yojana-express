var DataTypes = require("sequelize").DataTypes;
var _SequelizeMeta = require("./SequelizeMeta");
var _anugaman_samiti = require("./anugaman_samiti");
var _bill = require("./bill");
var _bills = require("./bills");
var _budget_karykram = require("./budget_karykram");
var _budget_project = require("./budget_project");
var _charkilla_letter = require("./charkilla_letter");
var _client_docs = require("./client_docs");
var _client_info = require("./client_info");
var _client_query = require("./client_query");
var _email = require("./email");
var _housemember = require("./housemember");
var _kanun_type = require("./kanun_type");
var _kanuninfo = require("./kanuninfo");
var _officials = require("./officials");
var _proj_beneficiary = require("./proj_beneficiary");
var _project_bittiy = require("./project_bittiy");
var _project_docs = require("./project_docs");
var _project_schedule = require("./project_schedule");
var _query_status = require("./query_status");
var _response = require("./response");
var _server_office = require("./server_office");
var _tax_heading = require("./tax_heading");
var _tbproj = require("./tbproj");
var _tolebikas = require("./tolebikas");
var _tolebikasmember = require("./tolebikasmember");
var _tolehouse = require("./tolehouse");
var _user = require("./user");
var _y_login = require("./y_login");

function initModels(sequelize) {
  var SequelizeMeta = _SequelizeMeta(sequelize, DataTypes);
  var anugaman_samiti = _anugaman_samiti(sequelize, DataTypes);
  var bill = _bill(sequelize, DataTypes);
  var bills = _bills(sequelize, DataTypes);
  var budget_karykram = _budget_karykram(sequelize, DataTypes);
  var budget_project = _budget_project(sequelize, DataTypes);
  var charkilla_letter = _charkilla_letter(sequelize, DataTypes);
  var client_docs = _client_docs(sequelize, DataTypes);
  var client_info = _client_info(sequelize, DataTypes);
  var client_query = _client_query(sequelize, DataTypes);
  var email = _email(sequelize, DataTypes);
  var housemember = _housemember(sequelize, DataTypes);
  var kanun_type = _kanun_type(sequelize, DataTypes);
  var kanuninfo = _kanuninfo(sequelize, DataTypes);
  var officials = _officials(sequelize, DataTypes);
  var proj_beneficiary = _proj_beneficiary(sequelize, DataTypes);
  var project_bittiy = _project_bittiy(sequelize, DataTypes);
  var project_docs = _project_docs(sequelize, DataTypes);
  var project_schedule = _project_schedule(sequelize, DataTypes);
  var query_status = _query_status(sequelize, DataTypes);
  var response = _response(sequelize, DataTypes);
  var server_office = _server_office(sequelize, DataTypes);
  var tax_heading = _tax_heading(sequelize, DataTypes);
  var tbproj = _tbproj(sequelize, DataTypes);
  var tolebikas = _tolebikas(sequelize, DataTypes);
  var tolebikasmember = _tolebikasmember(sequelize, DataTypes);
  var tolehouse = _tolehouse(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);
  var y_login = _y_login(sequelize, DataTypes);

  bill.belongsTo(bills, { as: "bills_ref_bill", foreignKey: "bills_ref"});
  bills.hasMany(bill, { as: "bills", foreignKey: "bills_ref"});
  budget_project.belongsTo(budget_karykram, { as: "bk", foreignKey: "bk_id"});
  budget_karykram.hasMany(budget_project, { as: "budget_projects", foreignKey: "bk_id"});
  client_docs.belongsTo(client_info, { as: "client", foreignKey: "client_id"});
  client_info.hasMany(client_docs, { as: "client_docs", foreignKey: "client_id"});
  client_query.belongsTo(client_info, { as: "client", foreignKey: "client_id"});
  client_info.hasMany(client_query, { as: "client_queries", foreignKey: "client_id"});
  query_status.belongsTo(client_query, { as: "query", foreignKey: "query_id"});
  client_query.hasMany(query_status, { as: "query_statuses", foreignKey: "query_id"});
  response.belongsTo(client_query, { as: "query", foreignKey: "query_id"});
  client_query.hasMany(response, { as: "responses", foreignKey: "query_id"});
  kanuninfo.belongsTo(kanun_type, { as: "kanun_type_kanun_type", foreignKey: "kanun_type"});
  kanun_type.hasMany(kanuninfo, { as: "kanuninfos", foreignKey: "kanun_type"});
  response.belongsTo(officials, { as: "official", foreignKey: "official_id"});
  officials.hasMany(response, { as: "responses", foreignKey: "official_id"});
  client_query.belongsTo(server_office, { as: "office_type_server_office", foreignKey: "office_type"});
  server_office.hasMany(client_query, { as: "client_queries", foreignKey: "office_type"});
  officials.belongsTo(server_office, { as: "office_code_server_office", foreignKey: "office_code"});
  server_office.hasMany(officials, { as: "officials", foreignKey: "office_code"});
  budget_project.belongsTo(tbproj, { as: "proj", foreignKey: "proj_id"});
  tbproj.hasMany(budget_project, { as: "budget_projects", foreignKey: "proj_id"});
  proj_beneficiary.belongsTo(tbproj, { as: "proj", foreignKey: "proj_id"});
  tbproj.hasMany(proj_beneficiary, { as: "proj_beneficiaries", foreignKey: "proj_id"});
  project_bittiy.belongsTo(tbproj, { as: "project", foreignKey: "project_id"});
  tbproj.hasMany(project_bittiy, { as: "project_bittiys", foreignKey: "project_id"});
  project_docs.belongsTo(tbproj, { as: "project", foreignKey: "project_id"});
  tbproj.hasMany(project_docs, { as: "project_docs", foreignKey: "project_id"});
  project_schedule.belongsTo(tbproj, { as: "project", foreignKey: "project_id"});
  tbproj.hasMany(project_schedule, { as: "project_schedules", foreignKey: "project_id"});
  anugaman_samiti.belongsTo(tolebikas, { as: "tolebk", foreignKey: "tolebks_id"});
  tolebikas.hasMany(anugaman_samiti, { as: "anugaman_samitis", foreignKey: "tolebks_id"});
  tbproj.belongsTo(tolebikas, { as: "tb", foreignKey: "tb_id"});
  tolebikas.hasMany(tbproj, { as: "tbprojs", foreignKey: "tb_id"});
  tolebikasmember.belongsTo(tolebikas, { as: "tolebika", foreignKey: "tolebikas_id"});
  tolebikas.hasMany(tolebikasmember, { as: "tolebikasmembers", foreignKey: "tolebikas_id"});
  tolehouse.belongsTo(tolebikas, { as: "tb", foreignKey: "tbs_id"});
  tolebikas.hasMany(tolehouse, { as: "tolehouses", foreignKey: "tbs_id"});
  housemember.belongsTo(tolehouse, { as: "house", foreignKey: "house_id"});
  tolehouse.hasMany(housemember, { as: "housemembers", foreignKey: "house_id"});
  bills.belongsTo(user, { as: "admin", foreignKey: "admin_id"});
  user.hasMany(bills, { as: "bills", foreignKey: "admin_id"});
  charkilla_letter.belongsTo(user, { as: "admin", foreignKey: "admin_id"});
  user.hasMany(charkilla_letter, { as: "charkilla_letters", foreignKey: "admin_id"});

  return {
    SequelizeMeta,
    anugaman_samiti,
    bill,
    bills,
    budget_karykram,
    budget_project,
    charkilla_letter,
    client_docs,
    client_info,
    client_query,
    email,
    housemember,
    kanun_type,
    kanuninfo,
    officials,
    proj_beneficiary,
    project_bittiy,
    project_docs,
    project_schedule,
    query_status,
    response,
    server_office,
    tax_heading,
    tbproj,
    tolebikas,
    tolebikasmember,
    tolehouse,
    user,
    y_login,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
