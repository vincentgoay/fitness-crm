drop database if exists fitness;

create database fitness;

use fitness;

drop table if exists users;

create table users(
    id int not null auto_increment,
    email varchar(128) not null,
    username varchar(64) not null,
    display_name varchar(128),
    role_id enum('admin', 'premium', 'member') default 'member',
    setting_id int not null,
    created_at timestamp default current_timestamp,

    primary key (username)
);

create table settings(
    id int not null auto_increment,
    password varchar(32) not null,
    two_factor_auth_secret varchar(256),
    user_email varchar(128) not null,

    primary key(id),
    constraint fk_user_email
        foreign key(user_email) references users(email)
)