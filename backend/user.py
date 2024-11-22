class User:
    def __init__(self, physics_interest: int, chemistry_interest: int, 
                 astronomy_interest: int, biology_interest: int, 
                 language: str, reading_level: str):
        """
        Initializes a User instance with interest levels and preferences.

        :param physics_interest: Interest level in physics (0-100)
        :param chemistry_interest: Interest level in chemistry (0-100)
        :param astronomy_interest: Interest level in astronomy (0-100)
        :param biology_interest: Interest level in biology (0-100)
        :param language: Preferred language of the user
        :param reading_level: Reading level of the user (e.g., 'beginner', 'intermediate', 'advanced')
        """
        self.interests = {
            'physics': physics_interest,
            'chemistry': chemistry_interest,
            'astronomy': astronomy_interest,
            'biology': biology_interest
        }
        self.language = language
        self.reading_level = reading_level

    def get_interests(self):
        """
        Returns the user's interest levels.
        """
        return self.interests
    
    def set_interests(self, interests):
        """
        Sets the user's interest levels.
        """
        self.interests = interests

    def get_language(self):
        """
        Returns the user's preferred language.
        """
        return self.language
    
    def set_language(self, language):
        """
        Sets the user's preferred language.
        """
        self.language = language

    def get_reading_level(self):
        """
        Returns the user's reading level.
        """
        return self.reading_level
    
    def set_reading_level(self, reading_level):
        """
        Sets the user's reading level.
        """
        self.reading_level = reading_level

    def __str__(self):
        """
        Returns a string representation of the User instance.
        """
        return (f"User Interests: {self.interests}, "
                f"Language: {self.language}, "
                f"Reading Level: {self.reading_level}")

