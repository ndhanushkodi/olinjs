(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['twote_disp'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var alias1=this.lambda, alias2=this.escapeExpression;

  return "\n		<li id='"
    + alias2(alias1((depth0 != null ? depth0._id : depth0), depth0))
    + "' class=\"twotes\">\n			<div id=\"twote\">"
    + alias2(alias1((depth0 != null ? depth0.text : depth0), depth0))
    + "</div> \n			<div class=\"twote_user\" class=\""
    + alias2(alias1((depth0 != null ? depth0.user : depth0), depth0))
    + "\">-"
    + alias2(alias1((depth0 != null ? depth0.user : depth0), depth0))
    + "</div>\n		</li>\n";
},"useData":true});
})();
