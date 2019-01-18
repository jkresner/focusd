var sttu = {
  'AT90': { title: 'Agricultural Tenancies Act 1990', by: 'NSW', yr: '1990', no: '64', url: 'legislation.nsw.gov.au/~/view/act/1990/64' },
  'CT13': { title: 'Civil and Administrative Tribunal Act', by: 'NSW', yr: '2013', no: '2', url: 'legislation.nsw.gov.au/~/view/act/2013/2' },
  'CT14': { title: 'Civil and Administrative Tribunal Rules', by: 'NSW', yr: '2014', no: '26', url: 'legislation.nsw.gov.au/~/view/regulation/2014/26' },
  'CA10': { title: 'Commercial Arbitration Act 2010', by: 'NSW', yr: '2010', no: '61', url: 'legislation.nsw.gov.au/~/view/act/2010/61' },
  'CD89': { title: 'Community Land Development Act', by: 'NSW', yr: '1989', no: '201', url: 'legislation.nsw.gov.au/~/view/act/1989/201' },
  'CM89': { title: 'Community Land Management Act', by: 'NSW', yr: '1989', no: '202', url: 'legislation.nsw.gov.au/~/view/act/1989/202' },
  'CR80': { title: 'Contracts Review Act', by: 'NSW', yr: '1980', no: '16', url: 'legislation.nsw.gov.au/~/view/act/1980/16' },
  'CN19': { title: 'Conveyancing Act', by: 'NSW', yr: '1919', no: '6', url: 'legislation.nsw.gov.au/~/view/act/1919/6' },
  'CP01': { title: 'Corporations Act', by: 'AU', yr: '2001', no: '50', url: 'legislation.gov.au/Details/C2018C00424' },
  'CR00': { title: 'Crimes Act', by: 'NSW', yr: '1900', no: '40', url: 'legislation.nsw.gov.au/~/view/act/1900/40' },
  'CV06': { title: 'Crimes Amendment (Apprehended Violence) Act', by: 'NSW', yr: '2006', no: '73', url: 'legislation.nsw.gov.au/~/view/act/2006/73' },
  'CV07': { title: 'Crimes (Domestic and Personal Violence) Act', by: 'NSW', yr: '2007', no: '80', url: 'legislation.nsw.gov.au/~/view/act/2007/80' },
  'CL04': { title: 'Crimes Legislation Amendment (Telecommunications Offences and Other Measures) Act', by: 'AU', yr: '2004', no: '2', url: 'legislation.gov.au/Details/C2006C00305' },
  'CC95': { title: 'Criminal Code Act', by: 'AU', yr: '1995', no: '12', url: 'legislation.gov.au/Details/C2019C00003' },
  'DA05': { title: 'Defamation Act', by: 'NSW', yr: '2005', no: '77', url: 'legislation.nsw.gov.au/~/view/act/2005/77' },
  'DD92': { title: 'Disability Discrimination Act 1992', by: 'AU', yr: '1992', no: '135', url: 'legislation.gov.au/Details/C2018C00125' },
  'DF91': { title: 'Dividing Fences Act ', by: 'NSW', yr: '1991', no: '72', url: 'legislation.nsw.gov.au/~/view/act/1991/72' },
  'EF18': { title: 'Electoral Funding Act', by: 'NSW', yr: '2018', no: '20', url: 'legislation.nsw.gov.au/~/view/act/2018/20' },
  'ED81': { title: 'Election Funding, Expenditure and Disclosures Act', by: 'NSW', yr: '1981', no: '78', url: 'legislation.nsw.gov.au/~/view/act/1981/78' },
  'ET17': { title: 'Electronic Transactions Legislation Amendment (Government Transactions) Act', by: 'NSW', yr: '2017', no: '25', url: 'legislation.nsw.gov.au/~/view/act/2017/25' },
  'EP79': { title: 'Environment Planning & Assessment Act', by: 'NSW', yr: '1979', no: '203', url: 'legislation.nsw.gov.au/~/view/act/1979/203' },
  'FT87': { title: 'Fair Trading Act', by: 'NSW', yr: '1987', no: '68', url: 'legislation.nsw.gov.au/~/view/act/1987/68' },
  'HB89': { title: 'Home Building Act', by: 'NSW', yr: '1989', no: '147', url: 'legislation.nsw.gov.au/~/view/act/1989/147' },
  'HB14': { title: 'Home Building Regulation 2014', by: 'NSW', yr: '2014', no: '811', url: 'legislation.nsw.gov.au/~/view/regulation/2014/811' },
  'HB17': { title: 'Home Building Amendment (Compensation Reform)', by: 'NSW', yr: '2017', no: '28', url: 'legislation.nsw.gov.au/#/view/act/2017/28' },
  'IN87': { title: 'Interpretation Act', by: 'NSW', yr: '1987', no: '15', url: 'legislation.nsw.gov.au/~/view/act/1987/15' },
  'IS73': { title: 'Insurance Act', by: 'AU', yr: '1973', no: '76', url: 'legislation.gov.au/Details/C2018C00389' },
  'IA69': { title: 'Imperial Acts Application Act 1969', by: 'NSW', yr: '1969', no: '30', url: 'legislation.nsw.gov.au/~/view/act/1969/30' },
  'LG93': { title: 'Local Government Act', by: 'NSW', yr: '1993', no: '30', url: 'legislation.nsw.gov.au/~/view/act/1993/30' },
  'PA02': { title: 'Property, Stock and Business Agents Act', by: 'NSW', yr: '2002', no: '66', url: 'legislation.nsw.gov.au/#/view/act/2002/66' },
  'PA14': { title: 'Property, Stock and Business Agents Regulation', by: 'NSW', yr: '2014', no: '563', url: 'legislation.nsw.gov.au/#/view/regulation/2014/563' },
  'PA18': { title: 'Property Stock Agents Regulation 2018', by: 'NSW', yr: '2018', no: '5', url: 'legislation.nsw.gov.au/#/view/act/2018/5' },
  'RP00': { title: 'Real Property Act', by: 'NSW', yr: '1900', no: '25', url: 'legislation.nsw.gov.au/~/view/act/1900/25' },
  'SD15': { title: 'Strata Schemes Development Act', by: 'NSW', yr: '2015', no: '51', url: 'legislation.nsw.gov.au/#/view/act/2015/51' },
  'SD73': { title: 'Strata Schemes (Freehold Development) Act', by: 'NSW', yr: '1973', no: '68', url: 'legislation.nsw.gov.au/~/view/act/1973/68' },
  'SM15': { title: 'Strata Schemes Management Act', by: 'NSW', yr: '2015', no: '50', url: 'legislation.nsw.gov.au/#/view/act/2015/50' },
  'SD86': { title: 'Strata Schemes (Leasehold Development) Act', by: 'NSW', yr: '1986', no: '219', url: 'legislation.nsw.gov.au/~/view/act/1986/219' },
  'SM96': { title: 'Strata Schemes Management Act', by: 'NSW', yr: '1996', no: '138', url: 'legislation.nsw.gov.au/#/view/act/1996/138' },
  'SM16': { title: 'Strata Schemes Management Regulation', by: 'NSW', yr: '2016', no: '501', url: 'legislation.nsw.gov.au/#/view/regulation/2016/501' },
  'SL17': { title: 'Statute Law (Miscellaneous Provisions) Act (No 2) 2017 No 63', by: 'NSW', yr: '2017', no: '63', url: 'legislation.nsw.gov.au/#/view/act/2017/63' },
  'SC70': { title: 'Supreme Court Act', by: 'NSW', yr: '1970', no: '52', url: 'legislation.nsw.gov.au/~/view/act/1970/52' },
  'WC87': { title: 'Workers Compensation Act', by: 'NSW', yr: '1987', no: '70', url: 'legislation.nsw.gov.au/~/view/act/1987/70' },
  'WI98': { title: 'Workplace Injury Management and Workers Compensation Act', by: 'NSW', yr: '1998', no: '86', url: 'legislation.nsw.gov.au/~/view/act/1998/86' },
  'WH11': { title: 'Work Health and Safety Act 2011', by: 'NSW', yr: '2011', no: '137', url: 'legislation.gov.au/Details/C2017C00305' },
  'LE02': { title: 'Law Enforcement (Powers and Responsibilities) Act', by: 'NSW', yr: '2002', no: '103', url: 'legislation.nsw.gov.au/~/view/act/2002/103' },
  'EV95': { title: 'Evidence Act', by: 'NSW', yr: '1995', no: '25', url: 'legislation.nsw.gov.au/~/view/act/1995/25' },
  'CC67': { title: 'Costs in Criminal Cases Act', by: 'NSW', yr: '1967', no: '13', url: 'legislation.nsw.gov.au/~/view/act/1967/13' },
  'CL02': { title: 'Civil Liability Act', by: 'NSW', yr: '2002', no: '22', url: 'legislation.nsw.gov.au/#/view/act/2002/22' },
}

var lookup = {}
for (var key in sttu) {
  var title = sttu[key].title, 
      year = sttu[key].yr, 
      no = sttu[key].no,       
      url = 'https://'+sttu[key].url;
  var titlefull = title+' '+year+' No '+no
  var titleyr = title+' '+year
  lookup['['+titlefull+']'] = '['+titlefull+']: '+url+' "'+key+'"' 
  lookup['['+titleyr+']'] = '['+titleyr+']: '+url+' "'+key+'"' 
  lookup['['+title+']'] = '['+title+']: '+url+' "'+key+'"' 
}


module.exports = lookup
