package com.sistema.examenes.servicios.impl;

import com.sistema.examenes.modelo.Task;
import com.sistema.examenes.modelo.Usuario;
import com.sistema.examenes.modelo.UsuarioRol;
import com.sistema.examenes.repositorios.TaskRepository;
import com.sistema.examenes.servicios.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaskServiceImpl implements TaskService {
    @Autowired
    private TaskRepository taskRepository;

    @Override
    public List<Task> listarTask(int id) throws Exception {
        try {
            List<Task> taskResponses = taskRepository.listarTask(id);
            return taskResponses;
        }catch (Exception e){
            throw new Exception(e.getMessage());
        }
    }



    @Override
    public void update(Task request, Long id) throws Exception {
        Optional<Task> task = this.taskRepository.findById(id);
        Task tasks = task.get();

        if(!request.getDescription().isEmpty()){
            tasks.setDescription(request.getDescription());
        }
        if (!request.getTitle().isEmpty()){
            tasks.setTitle(request.getTitle());
        }
        if (!request.getState().isEmpty()){
            tasks.setState(request.getState());
        }
        this.taskRepository.save(tasks);
    }

    @Override
    public Task listById(int id) throws Exception {
        try {
            return taskRepository.listById(id);
        }catch (Exception e){
            throw new Exception(e.getMessage());
        }
    }

    @Override
    public Task guardarTask(Task task) throws Exception {
        return taskRepository.save(task);
    }

    @Override
    public void eliminarTask(Long id) throws Exception {
        taskRepository.deleteById(id);
    }
}
