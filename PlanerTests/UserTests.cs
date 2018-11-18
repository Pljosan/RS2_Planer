using System;
using Xunit;
using Planer.Models;

namespace PlanerTests{

    public class UserTests{

        [Fact]
        public void CanChangeFirstNAme() {
            //Given
            var g = new User{ FirstName = "Test"};
        
            //When
            g.FirstName = "TestNew";
        
            //Then
            Assert.Equal("TestNew", g.FirstName);
        }
    }
}