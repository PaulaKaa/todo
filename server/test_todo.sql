drop table if exists task;

create table task (
    id serial primary key,
    description varchar(255) not null
);

insert into task (description) value ('My test task');
insert into task (description) value ('My other test task');