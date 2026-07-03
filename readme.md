# Project 1 - [CALENDLY]

- Calendly makes scheduling simple another exmaple is topmate

# Learnings
 - DB Design
 - Serverup setup with express and ts
 - 2 types of comunication api sync and async
 - message queue - temporal etc [rabbitmq,kafka]
 - rdms - mysql | psql
 - zod [type validations]
 - docker

# Advanced
 -- Race conditions for concurrent bookings
 -- google apis

# Db desgin
  - people should be able to add available slots
  - others can book a slot for them for meeting a specific person
  - recurring slots , exception 
  - cancel a booking
  - if a user is putting up slots for booking then they can select      either the slot to be of 15min,30min ,1hr or 2hr
  - Availability case
 
# Questions to get clearity
  * How the usecase seens like or rquirements
    - A person is available from 11am to 3pm and 5pm everyday with 30 min and only on sun 10am to 12pm with 15mins slot
  * Query patterns - simple query and not on go computation
  * Deduplication and relations - instead of storing complete address , store that address id deduplicaion/normalisation.
    

# This problem is in airbnb , booking apps , appoitments app in different flavours


# 2 ways to solve problem
  # store the available slots pre computed of a host
    - pros
      * reads will be fast
      * adding exceptions is easy [unavailibilty]
    - cons
      * storage cost , but ok and less cost
      /*
         1 user - 3 mon - 1000 rec (avg)
         1 user - 12mon - 5000 rec
         10k user - 10000*5000 = 5 * 10^ 7 rec
         10M user - 10 * 10^7 users
         5000 * 10^7 - 5 * 10^7 - 50B rec
         1 rec - 10 bytes
         50B * 10 bytes - 50 * 10^9 * 10bytes = 500gb (iphone has this amt of storage than db will have 100x more)
      */
    
  # compute the available of a host on the go
    - pros 
      * storage / space
    - cons
      * algorithm complexity , computation time (latency increase)
      * while booking and unavailiblity expection also need to compute again

[**Approach 1 is better as application is read heavy**]
[**Approach 2 can better when algorithm is less complex**]


# System Design


# Flow
  
 client (postman/frontend)  <-> calendly server <-> database

---server---
routing- controllers - services - repostories - db

synchronous api - call api -wait for response
but some api will be asynchronous

asynchrous api
 -- client -- req -- server -- [fifi]queuse -201- add slots in background -- worker server --  bulk insert/batch insert -- db stored

Message queue (push method) push msg auto to server
 - rabbitmq
 - aws sqs

alernative (pull method)
 - kafka (event streaming and can also act as message queue)
 - temporal (workflow orchestrator and act as message queue)

# Api
  // get slots of particular host
  - GET /api/v1/users/:user_id/slots?start_month=jun&end_month=july
  
  // reserve a slot
  - POST /api/v1/slot/:slot_id
      body : {
        invitee_id
      }

  // add a slot from host / availability prefrence
  - POST api/v1/availability
      body : {
          host_id
          avaiablity_preference : [
            {
                day:sunday
                start_time:1100
                end_time : 1500
                duration : 60,
                is_recuring:true // every sunday nxt 3months
            },
           {
                day:sunday
                start_time:1800
                end_time : 2000
                duration : 30
                is_recuring : false // only sunday nxt 3months
            }
            ....
          ]
      }

    // cancel booking/reservation
    - PUT api/v1/reservation/:reservation_id
       body : {
         status  : cancel
       }
       or Delete

    // exception 
    - PUT api/v1/availability/holiday
      body : {
        payload : [
            {
                date : "dd-mm-yyyy",
                type : fullday
            },
            {
                date :"dd-mm-yyy",
                type : partial,
                start_time 
                end_time 
            }
        ]
      }

# database design

# Users
  - id
  - name
  - email
  - password
  - phone
  - created_at
  - updated_at


# Slots
  - id
  - host_id - user_id
  - date
  - start_time
  - end_time
  - duration
  - status (available,booked,unavailable)
  - created_at
  - updated_at

# Bookings
  - id
  - host_id
  - invitee_id
  - status
  - created_at
  - updated_at

# Availability_Preferences
 - id
 - host_id
 - day
 - start_time
 - end_time
 - duration
 - is_recuring
 - created_at
 - updated_at

# Hoilday
 - id
 - host_id
 - date
 - start_time
 - end_time
 - duration
 - created_at
 - updated_at

repository
service
controller
router