package com.test.ecommercesystem.service;

import com.test.ecommercesystem.model.User;

import java.util.List;

public interface UserService {
    public User saveUser(User user);

    public List<User> getAllUsers();

    public int checkUser(User user);

    public int checkCreateUser(User user);

    public int authorizeUser(String token);

}
