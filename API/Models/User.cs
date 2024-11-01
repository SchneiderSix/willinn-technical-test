using System.ComponentModel.DataAnnotations;

namespace API.Models
{
    public class User
    {
        [Required]
        [RegularExpression(@"^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{10,}$",
    ErrorMessage = "{0} must be at least {1} characters long and contain both letters and numbers.")]
        public string ID { get; set; } = null!;

        [Required]
        [StringLength(30, ErrorMessage = "{0} value cannot exceed {1} characters.")]
        public string Name { get; set; } = null!;

        [Required]
        [EmailAddress(ErrorMessage = "{0} must be a valid email address.")]
        public string Email { get; set; } = null!;

        [Required]
        [RegularExpression(@"^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{10,}$",
    ErrorMessage = "{0} must be at least {1} characters long and contain both letters and numbers.")]
        public string Password { get; set; } = null!;
        public bool IsActive { get; set; } = true;
    }
}
