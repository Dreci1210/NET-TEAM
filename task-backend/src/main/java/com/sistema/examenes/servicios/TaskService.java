package com.sistema.examenes.servicios;


import com.sistema.examenes.modelo.Task;
import com.sistema.examenes.modelo.Usuario;
import com.sistema.examenes.modelo.UsuarioRol;

import java.util.List;
import java.util.Set;

public interface TaskService {
    List<Task> listarTask(int id) throws Exception;
    void update(Task request, Long id) throws Exception;

    Task listById(int id) throws Exception;

    public Task guardarTask(Task task) throws Exception;

    public void eliminarTask(Long id) throws Exception;
}
