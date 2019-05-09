/**
 * Set the query params from url to a existing selector.
 *
 * @param selector
 *   Selector.
 */
function inherit_link_query_params(selector) {
  if ($(selector).length > 1) {
    $(selector).each(function(index,value)
    {
      inherit_link_query_params_process_element(value);
    });
  }
  else if ($(selector).length == 1) {
    inherit_link_query_params_process_element(selector);
  }
}

/**
 * Prepare inherit link for a specifig element.
 *
 * @param selector
 *   Selector.
 */
function inherit_link_query_params_process_element(selector) {
  var element = $(selector);
  var url_parameters = inherit_link_query_params_extract_url_parameters(window.location.href);
  var link_parameters = inherit_link_query_params_extract_url_parameters(element.attr('href'));
  var parameters = [];
  for (var uindex in url_parameters) {
    if (url_parameters[uindex] != null) {
      link_parameters[uindex] = url_parameters[uindex];
    }
    else if (link_parameters[uindex] == null) {
      link_parameters[uindex] = null;
    }
  }

  for (var lindex in link_parameters) {
    if (link_parameters[lindex] != null) {
      parameters.push(lindex + '=' + link_parameters[lindex]);
    }
    else {
      parameters.push(lindex);
    }
  }

  if (parameters.length > 0) {
    var href_without_querystring = element.attr('href').split('?')[0];

    var final_href = href_without_querystring + '?' + parameters.join('&');
    element.attr('href', final_href);
  }
}
/**
 * Get url parameters from string.
 *
 * @param url
 *   Url.
 */
function inherit_link_query_params_extract_url_parameters(url) {
  var parameters = {};
  var parameters_beggining_caracter_position = url.indexOf('?');
  if (parameters_beggining_caracter_position !== -1) {
    var parameter_list_raw = url.substring(parameters_beggining_caracter_position + 1).split('&');
    for (var index in parameter_list_raw) {
      var parameter_keyvalue = parameter_list_raw[index].split('=');
      parameters[parameter_keyvalue[0]] =  typeof (parameter_keyvalue[1] != 'undefined') ? parameter_keyvalue[1] : null;
    }
  }
  return parameters;
}
