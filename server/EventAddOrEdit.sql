CREATE DEFINER=`apiuser`@`localhost` PROCEDURE `EventAddOrEdit`(
IN _id INT(11),
IN _date varchar(11),
IN _name varchar(255),
IN _birthday tinyint(1),
in _content mediumtext
)
BEGIN
	IF _id = 0 THEN 
		insert into events(date, name, birthday, content)
        values (_date, _name, _birthday, _content);
        
        SET _id = LAST_INSERT_ID();
	ELSE 
		UPDATE events
        SET
        date = _date,
        name = _name,
        birthday = _birthday,
        content = _content
        WHERE id = _id;
	END IF;
    
    SELECT _id AS 'id';
END