SELECT
  m.id as metrics_id,
  m.datetime,
  m.cpu_utilization,
  m.memory_utilization,
  m.disk_utilization,
  m.node_id
FROM metrics as m
LEFT JOIN nodes as n ON m.node_id = n.id 
WHERE m.node_id = :nodeId
