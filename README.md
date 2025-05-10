###  Initial Commit 
https://github.com/punyprogrammer/project-management/commit/389cfc00de786b459c01022811da9d74d2f4c03a

### Redux toolkit integration
https://github.com/punyprogrammer/project-management/pull/1

### Backend setup with prisma and data-seeder
https://github.com/punyprogrammer/project-management/pull/2

### Express setup 
https://github.com/punyprogrammer/project-management/pull/3

### Add initial endpoints for tasks and projects
https://github.com/punyprogrammer/project-management/pull/4

### Initial RTK queries and mutations
https://github.com/punyprogrammer/project-management/pull/5

### Complete Project Page Header
https://github.com/punyprogrammer/project-management/pull/6

### Complete Board View with Drag and Drop
https://github.com/punyprogrammer/project-management/pull/7

### Reset index 
`SELECT setval(pg_get_serial_sequence('"[DATA_MODEL_NAME_HERE]"', 'id'), coalesce(max(id)+1, 1), false) FROM "[DATA_MODEL_NAME_HERE]";
Sample for table project SELECT setval(pg_get_serial_sequence('"Project"', 'id'), coalesce(max(id)+1, 1), false) FROM "Project";

