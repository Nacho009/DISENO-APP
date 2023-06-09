// package edu.uclm.esi.ds.games.config;


// import edu.uclm.esi.ds.games.dao.UserDAO;
// import edu.uclm.esi.ds.games.entities.User;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.beans.factory.annotation.Qualifier;
// import org.springframework.security.core.userdetails.UserDetails;
// import org.springframework.security.core.userdetails.UserDetailsService;
// import org.springframework.security.core.userdetails.UsernameNotFoundException;
// import org.springframework.stereotype.Service;

// @Qualifier("Custom")
// @Service
// public class CustomUserDetailsService implements UserDetailsService {

//     @Autowired
//     private UserDAO userRepository;

//     @Override
//     public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//         User user = userRepository.findByName(username);

//         if (user == null) {
//             throw new UsernameNotFoundException("User not found");
//         }

//         return org.springframework.security.core.userdetails.User
//             .withUsername(user.getName())
//             .password(user.getPwd())
//             .roles("USER")
//             .build();
//     }
// }
