class MembershipApplication < ApplicationRecord
  validates :email, :phone, :full_name, :birthday,
            :address, :postal_code, :city, :user_id, presence: true
  validates :pending, inclusion: { in: [true, false] }
  validates :email, uniqueness: true
  validates :username, uniqueness: { allow_blank: true }
  validates :postal_code, length: { is: 5 }
  validates :postal_code, numericality: true
  validates :member_type, inclusion: { in: ["Täysjäsen", "Nuorisojäsen (alle 18v)", "Kannatusjäsen"],
    message: "Valitse jäsenyyden tyyppi" }
  validate :username_blank_or_between_8_and_25_characters

  # validation for optional fields
  validates :sil_membership_number, numericality: { allow_blank: true }
  validates :join_sil, inclusion: { in: ["willJoin", "willNotJoin", "alreadyMember"], allow_blank: true }

  def username_blank_or_between_8_and_25_characters
    unless self.username.nil? or (self.username.length > 7 and self.username.length < 26)
      errors.add(:username, 'pitää olla tyhjä tai 8-25 merkkiä pitkä')
    end
  end
end
