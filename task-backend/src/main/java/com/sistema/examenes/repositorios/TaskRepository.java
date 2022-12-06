package com.sistema.examenes.repositorios;

import com.sistema.examenes.modelo.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {
    @Query(value = "SELECT * FROM task INNER JOIN usuarios ON task.usuario_id = usuarios.id WHERE usuarios.id = ?", nativeQuery = true)
    public List<Task> listarTask(int id);

    @Query(value = "SELECT * FROM task WHERE id = ?", nativeQuery = true)
    public Task listById(int id);


}
