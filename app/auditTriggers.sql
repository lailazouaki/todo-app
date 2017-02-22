-- Update task
DELIMITER //
CREATE TRIGGER update_task AFTER UPDATE ON task FOR EACH ROW
	BEGIN
		INSERT INTO task_audit (row, old_description, old_isDone, old_isArchived, operation)
			VALUES (new.id, new.description, new.isDone, new.isArchived, 'UPDATE');
	END; 

-- Create task
CREATE TRIGGER add_task AFTER INSERT ON task FOR EACH ROW 
	BEGIN
		INSERT INTO task_audit (row, old_description, old_isDone, old_isArchived, operation)
			VALUES (new.id, new.description, new.isDone, new.isArchived, 'INSERT');
	END; //

DELIMITER ;