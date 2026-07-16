begin;
select plan(1);

select has_table('auth', 'users', 'A tabela auth.users deve existir');

select * from finish();
rollback;
