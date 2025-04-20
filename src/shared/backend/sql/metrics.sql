SELECT
  m.id as metrics_id,
  m.datetime,
  m.cpu_utilization,
  m.memory_utilization,
  m.disk_utilization,
  m.node_id,
  n.caption as node_caption,
  n.status as node_status_code,
  n.interface as node_interface,
  n.admin as node_admin
FROM metrics as m
LEFT JOIN nodes as n ON m.node_id = n.id 
