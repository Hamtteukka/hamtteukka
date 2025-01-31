package com.ssafy.hamtteukka.repository;

import com.ssafy.hamtteukka.domain.UserSubscribe;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SubscribeRepository extends JpaRepository<UserSubscribe,Long> {
}
