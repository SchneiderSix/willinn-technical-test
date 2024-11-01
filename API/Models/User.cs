using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace API.Models
{
    public class User
    {
        [Required]
        [StringLength(100, ErrorMessage = "{0} value cannot exceed {1} characters.")]
        public string ID { get; set; } = null!;

        [Required]
        [StringLength(30, ErrorMessage = "{0} value cannot exceed {1} characters.")]
        public string Name { get; set; } = null!;

        [Required]
        [EmailAddress(ErrorMessage = "{0} must be a valid email address.")]
        [StringLength(100, ErrorMessage = "{0} value cannot exceed {1} characters.")]
        public string Email { get; set; } = null!;

        [RegularExpression(@"^^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)[\S]{8,}$",
        ErrorMessage = "{0} must contain at least one special character, one number, one upper case and one lower case.")]
        [StringLength(100, ErrorMessage = "{0} value cannot exceed {1} characters.")]
        public string Password { get; set; } = null!;
        public bool IsActive { get; set; } = true;
    }
}
