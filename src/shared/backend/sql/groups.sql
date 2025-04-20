SELECT
  g.id as group_id,
  g.caption as group_caption,
  n.id as node_id,
  n.caption as node_caption,
  n.status as node_status_code,
  ns.color as node_status_color,
  ns.description as node_status_description,
  i.id as interface_id,
  i.caption as interface_caption,
  i.status as interface_status_code,
  ins.color as interface_status_color,
  ins.description as interface_status_description,
  a.id as application_id,
  a.caption as application_caption,
  u.id as admin_id,
  u.firstname as admin_firstname,
  u.lastname as admin_lastname,
  u.email as admin_email
FROM groups as g
LEFT JOIN groups_nodes as gn ON g.id = gn.group_id
LEFT JOIN nodes as n ON gn.node_id = n.id
LEFT JOIN statuses as ns ON n.status = ns.id
LEFT JOIN interfaces as i ON n.interface = i.id
LEFT JOIN statuses as ins ON i.status = ins.id
LEFT JOIN nodes_applications as na ON n.id = na.node_id
LEFT JOIN applications as a ON na.application_id = a.id
LEFT JOIN users as u ON n.admin = u.id

